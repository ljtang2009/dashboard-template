const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');
const { getFilesByDir } = require('./fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const bytenode = require('bytenode');
const { writeEnvProperties } = require('./env');
const _ = require('lodash');

/**
 * 生成 tsconfig 带 outDri
 * @param { Object } option
 * @param { string } option.srcDirName
 * @param { string } [option.tempFileName]
 * @param { string } option.sourceFileName 源配置文件名
 * @param { string } option.distDirName ourDir 文件夹名
 * @returns { PromiseLike<{tempConfigFilePath: string, tempConfigFileName: string}> } 临时配置文件路径
 */
async function _generatedTsConfigWithOurDir(option) {
  const srcDirPath = path.resolve(process.cwd(), `./${option.srcDirName}`);
  const tempConfigFileName = option.tempFileName ? option.tempFileName : 'tsconfig.temp.json';
  const tempConfigFilePath = path.resolve(srcDirPath, `./${tempConfigFileName}`);
  let configJson = await fs.readJson(path.resolve(srcDirPath, `./${option.sourceFileName}`));
  configJson = _.merge(configJson, { compilerOptions: { outDir: `../${option.distDirName}` } });
  await fs.writeJSON(tempConfigFilePath, configJson);
  return {
    tempConfigFilePath,
    tempConfigFileName,
  };
}

/**
 * 编译typescript
 * @param { { distDirName: string, srcDirName: string, haveLaunch?: boolean } } option
 * @returns { PromiseLike<void> }
 */
async function tscCompile(option) {
  // HACK 把ts中的paths编译成相对路径, 需要 tsc-alias.
  // tsc-alias 命令不能配置 --outDir.
  // 如果 tsc outDir 与 tsc-alias 的 outDir 不一致， 则 tsc-alias 不能把paths编译成相对路径。
  // 所以如果要指定outDir，只能修改ts配置文件。

  let tempConfigInfo;
  if (option.haveLaunch) {
    tempConfigInfo = await _generatedTsConfigWithOurDir({
      srcDirName: option.srcDirName,
      sourceFileName: 'tsconfig.exclude-launch.json',
      distDirName: option.distDirName,
    });
  } else {
    // 生成 设置 outDir 的 tsconfig.json 的 临时文件
    tempConfigInfo = await _generatedTsConfigWithOurDir({
      srcDirName: option.srcDirName,
      sourceFileName: 'tsconfig.json',
      distDirName: option.distDirName,
    });
  }
  const execStrList = [
    // 编译 src
    `tsc --project ${option.srcDirName}/${tempConfigInfo.tempConfigFileName} && tsc-alias --project ${option.srcDirName}/${tempConfigInfo.tempConfigFileName}`,
  ];
  if (option.haveLaunch) {
    execStrList.push(
      // 编译 launch.js
      `tsc --project ${option.srcDirName}/tsconfig.launch.json --outDir ./${option.distDirName}`,
    );
  }
  const compilefunctionList = [];
  for (const execStr of execStrList) {
    compilefunctionList.push(
      (() => {
        return new Promise((resolve, reject) => {
          childProcess.exec(execStr, (err, stdout, stderr) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })(),
    );
  }
  await Promise.all(compilefunctionList);
  await fs.remove(tempConfigInfo.tempConfigFilePath);
}

/**
 * 混淆代码
 * @param { { distDirPath: string } } option
 * @returns { PromiseLike<void> }
 */
async function ugly(option) {
  const distFileList = await getFilesByDir(option.distDirPath);
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

exports.ugly = ugly;

/**
 * 编译字节码
 * @param { { distDirPath: string, filter?: (distFile: string) => boolean } } option
 * @returns { PromiseLike<void> }
 */
async function bytenodeCompile(option) {
  const distFileList = await getFilesByDir(option.distDirPath);
  const compileFunctions = [];
  for (const distFile of distFileList) {
    if (distFile.toLowerCase().endsWith('.js') && (!option.filter || (option.filter && option.filter(distFile)))) {
      // !distFile.endsWith('launch.js')
      compileFunctions.push(
        (() => {
          return new Promise((resolve, reject) => {
            bytenode
              .compileFile({
                filename: distFile,
                electron: true
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

exports.bytenodeCompile = bytenodeCompile;

/**
 * 编译字节码
 * @param { { distDirPath: string } } option
 * @returns { PromiseLike<void> }
 */
async function copyPackage(option) {
  const packageJson = await fs.readJson(path.resolve(process.cwd(), './package.json'));
  delete packageJson.scripts;
  await fs.outputJson(path.resolve(option.distDirPath, './package.json'), packageJson, { spaces: 2 });
}

/**
 * 复制文件
 * @param { { distDirPath: string, assetDirList: Array<string> } } option
 */
async function copyDist(option) {
  const copyFunctionList = [];
  for (const assetDir of option.assetDirList) {
    copyFunctionList.push(
      (() => {
        return new Promise((resolve, reject) => {
          fs.copy(path.resolve(process.cwd(), assetDir), path.resolve(option.distDirPath, assetDir))
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
 * @param { { distDirName: string, srcDirName: string, encrypt?: boolean, assetDirList?: Array<string> } } option
 * @returns { PromiseLike<void> }
 */

/**
 * 编译tsc
 * @param { Object } option
 * @param { string } option.distDirName
 * @param { string } option.srcDirName
 * @param { boolean } [option.encrypt]
 * @param { Array<string> } [option.assetDirList]
 * @param { boolean } [option.haveLaunch]
 * @param { (distFile: string) => boolean } [option.bytenodeCompileFilter] 字节码编译过滤器, 返回true表示需要编译字节码
 * @returns { PromiseLike<void> }
 */
exports.compile = async function (option) {
  const distDirName = option.distDirName;
  const distDirPath = path.resolve(process.cwd(), `./${distDirName}`);

  console.log('清理dist');
  await fs.remove(distDirPath);

  console.log('生成env.properties.json');
  // 因为编译后不能读取.env, 所以要生成env.properties
  await writeEnvProperties();

  console.log('编译typescript');
  await tscCompile({ srcDirName: option.srcDirName, distDirName: option.distDirName, haveLaunch: option.haveLaunch });

  if (option.encrypt) {
    console.log('混淆代码');
    await ugly({ distDirPath });

    console.log('编译字节码');
    await bytenodeCompile({ distDirPath, filter: option.bytenodeCompileFilter });
  }

  console.log('传输package.json');
  await copyPackage({ distDirPath });

  if (option.assetDirList && option.assetDirList.length > 0) {
    console.log('传输dist');
    copyDist({ distDirPath, assetDirList: option.assetDirList });
  }
};
