import path from 'path';
import { initEnv } from '@src-utils/env';
initEnv();
import { compile, ugly, bytenodeCompile } from '@src-utils/tsc-compile';
import { build, Platform } from 'electron-builder';
import { parseArgs } from '@src-utils/command';
import { GenericServerOptions } from 'builder-util-runtime';
import os from 'os';
import fs from 'fs-extra';

const processArgs = parseArgs();

async function electronBuild(option?: { appPath?: string }) {
  const platform = os.platform();

  const buildTarget = {
    isWin: ['win32', 'cygwin', 'msys'].indexOf(platform) > -1,
    isMac: platform === 'darwin',
  };

  const platformParam = processArgs['platform'];
  if (platformParam) {
    buildTarget.isWin = platformParam === 'windows';
    buildTarget.isMac = platformParam === 'mac';
  }

  if (!buildTarget.isWin && !buildTarget.isMac) {
    throw new Error('只支持Windows和Mac');
  }

  let subBuildDir = '';
  let buildTargetString;
  if (buildTarget.isWin) {
    subBuildDir = 'windows';
    buildTargetString = Platform.WINDOWS.createTarget();
  } else if (buildTarget.isMac) {
    subBuildDir = 'mac';
    buildTargetString = Platform.MAC.createTarget();
  }

  const distDir = path.resolve(process.cwd(), `./dist-electron/${subBuildDir}`);

  const buildResources = path.resolve(process.cwd(), `./src-electron-resources`);

  const publishServerOptions: GenericServerOptions = {
    provider: 'generic',
    url: `http://127.0.0.1:${process.env['ELECTRON_UPDATE_SERVER_PORT']}`,
  };

  const options = {
    appId: 'com.tanglijin.dashboard-template',
    directories: {
      output: distDir,
      buildResources,
      app: option && option.appPath ? option.appPath : null
    },
    extraMetadata: {
      main: './src-electron/launch.js',
    },
    win: {
      target: 'nsis',
      publish: { ...publishServerOptions, url: publishServerOptions.url + '/windows' },
    },
    nsis: {
      oneClick: false,
      allowToChangeInstallationDirectory: true,
      displayLanguageSelector: true,
      installerLanguages: ['zh-CN', 'en-US', 'zh-TW'],
      runAfterFinish: false,
    },
    mac: {
      darkModeSupport: true,
      publish: { ...publishServerOptions, url: publishServerOptions.url + '/mac' },
    },
    // files 会按顺序过滤
    files: [
      '!**/*',

      '**/dist/**/*',
      '**/src-api/**/*',
      '**/src-electron/**/*',
      '**/src-utils/**/*',

      '!**/*.map',
      '!**/tsconfig.tsbuildinfo',
      '!**/.log/**/*',

      "!**/.history/**/*",
      "!**/unpacked-electron/**/*",
      "!**/dist-api/**/*",
      "!**/dist-electron-publish/**/*",

      '**/node_modules/**/*',
      "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
      "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
      "!**/node_modules/*.d.ts",
      "!**/node_modules/.bin",
    ],
    extraFiles: [
      // api静态文件
      {
        from: path.resolve(process.cwd(), './public-api'),
        to: 'public-api',
      },
      // api内置静态文件
      {
        from: path.resolve(process.cwd(), './public-api-build-in'),
        to: 'public-api-build-in',
      },
    ],
  };

  const result = await build({
    targets: buildTargetString,
    config: options,
  })
  console.log(JSON.stringify(result));
  return {
    distDir
  }
}

async function srcApiCompile(option: { distDirName: string }) {
  const distDirName = option.distDirName;
  const srcDirName = 'src-api'
  const assetDirList = ['./dist']
  await compile({
    distDirName,
    srcDirName,
    assetDirList,
  })
}

(async () => {
  const distDirName = 'temp-build-electron';
  const distDirPath = path.resolve(process.cwd(), `./${distDirName}`)
  const srcELectronName = 'src-electron'

  await srcApiCompile({ distDirName })

  console.log('复制electron代码')
  await fs.copy(path.resolve(process.cwd(), `./${srcELectronName}`), path.resolve(distDirPath, `./${srcELectronName}`))

  // 是否加密
  const isEncrypt = !!processArgs['encrypt'];
  if (isEncrypt) {
    console.log('混淆代码');
    await ugly({ distDirPath })

    console.log('编译字节码');
    await bytenodeCompile({
      distDirPath, filter: (distFile) => {
        return !distFile.endsWith('launch.js') && distFile.indexOf('\\dist\\') === -1
      },
      isElectron: true
    });
  }

  console.log('打包electron');
  const electronBuildResult = await electronBuild({ appPath: distDirPath });

  console.log('移除临时代码')
  await fs.remove(distDirPath)

  console.log(`构建完成。文件存于 ${electronBuildResult.distDir}`);
})()
