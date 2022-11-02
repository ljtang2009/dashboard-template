const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');
const { getFilesByDir } = require('./fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const bytenode = require('bytenode');
const { initEnv } = require('./env');

const env = initEnv();

/**
 * 生成env.properties.json。
 * @returns { PromiseLike<void> }
 */
async function writeEnvJson() {
  await fs.outputJSON(path.resolve(process.cwd(), './src-utils/env.properties.json'), env, { spaces: 2 });
}

/**
 * 编译typescript
 * @param { { distDirName: string, srcDirName: string } } option
 * @returns { PromiseLike<void> }
 */
async function tscCompile(option) {
  const compilefunctionList = [];
  // 编译 src-api
  compilefunctionList.push(
    (() => {
      return new Promise((resolve, reject) => {
        const str = `tsc --project ${option.srcDirName}/tsconfig.exclude-launch.json && tscpaths --project ${option.srcDirName}/tsconfig.json --src ./${option.srcDirName} --out ./${option.distDirName}/src-api`;
        childProcess.exec(str, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })(),
  );
  // 编译 launch.js
  compilefunctionList.push(
    (() => {
      return new Promise((resolve, reject) => {
        const str = `tsc --project ${option.srcDirName}/tsconfig.launch.json`;
        childProcess.exec(str, (err, stdout, stderr) => {
          if (err) {
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })(),
  );
  await Promise.all(compilefunctionList);
}

/**
 * 混淆代码
 * @param { { distPath: string } } option
 * @returns { PromiseLike<void> }
 */
async function ugly(option) {
  const distFileList = await getFilesByDir(option.distPath);
  const uglyFunctions = [];
  for (const distFile of distFileList) {
    if (distFile.endsWith('.js')) {
      const content = JavaScriptObfuscator.obfuscate(fs.readFileSync(distFile).toString()).getObfuscatedCode();
      uglyFunctions.push(
        (() => {
          return new Promise((resolve, reject) => {
            fs.outputFile(distFile, content)
              .then(() => {
                resolve();
              })
              .catch((err) => reject(err));
          });
        })(),
      );
      await Promise.all(uglyFunctions);
    }
  }
}

/**
 * 编译字节码
 * @param { { distPath: string } } option
 * @returns { PromiseLike<void> }
 */
async function bytenodeCompile(option) {
  const distFileList = await getFilesByDir(option.distPath);
  const compileFunctions = [];
  for (const distFile of distFileList) {
    if (distFile.endsWith('.js') && !distFile.endsWith('launch.js')) {
      compileFunctions.push(
        (() => {
          return new Promise((resolve, reject) => {
            bytenode
              .compileFile({
                filename: distFile,
                // compileAsModule: true,
                // electron: true
              })
              .then(() => {
                return new Promise((removeResolve, removeReject) => {
                  fs.remove(distFile)
                    .then(() => {
                      removeResolve();
                    })
                    .catch((err) => removeReject(err));
                });
              })
              .then(() => resolve())
              .catch((err) => reject(err));
          });
        })(),
      );
    }
  }
  await Promise.all(compileFunctions);
}

/**
 * 编译字节码
 * @param { { distPath: string } } option
 * @returns { PromiseLike<void> }
 */
async function copyPackage(option) {
  const packageJson = await fs.readJson(path.resolve(process.cwd(), './package.json'));
  delete packageJson.scripts;
  await fs.outputJson(path.resolve(option.distPath, './package.json'), packageJson, { spaces: 2 });
}

/**
 * 复制文件
 * @param { { distPath: string, assetDirList: Array<string> } } option
 */
async function copyDist(option) {
  const copyFunctionList = [];
  for (const assetDir of option.assetDirList) {
    copyFunctionList.push(
      (() => {
        return new Promise((resolve, reject) => {
          fs.copy(path.resolve(process.cwd(), assetDir), path.resolve(option.distPath, assetDir))
            .then(() => resolve())
            .catch((err) => reject(err));
        });
      })(),
    );
  }
  await Promise.all(copyFunctionList);
}

/**
 * 编译tsc
 * @param { { distDirName: string, srcDirName: string, encrypt: boolean, assetDirList?: Array<string> } } option
 * @returns { PromiseLike<void> }
 */
exports.compile = async function (option) {
  const distDirName = option.distDirName;
  const distPath = path.resolve(process.cwd(), `./${distDirName}`);
  await fs.remove(distPath);
  console.log('生成env.properties.json');
  // 因为编译钱以后不能读取.env
  await writeEnvJson();
  console.log('编译typescript');
  await tscCompile({ srcDirName: option.srcDirName, distDirName: option.distDirName });
  if (option.encrypt) {
    console.log('混淆代码');
    await ugly({ distPath });
    console.log('编译字节码');
    await bytenodeCompile({ distPath });
  }
  console.log('传输package.json');
  await copyPackage({ distPath });
  if (option.assetDirList && option.assetDirList.length > 0) {
    console.log('传输dist');
    copyDist({ distPath, assetDirList: option.assetDirList });
  }
};
