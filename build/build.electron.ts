import { build, Platform } from 'electron-builder';
import { resolve } from 'path';
import { removeSync } from 'fs-extra';
import { parseArgs } from '@build/utils/command';

import os from 'os';
const platform = os.platform();

const buildTarget = {
  isWin: ['win32', 'cygwin', 'msys'].indexOf(platform) > -1,
  isMac: platform === 'darwin',
};

const processArgs = parseArgs();
const platformParam = processArgs['platform'];
if (platformParam) {
  buildTarget.isWin = platformParam === 'windows';
  buildTarget.isMac = platformParam === 'mac';
} else {
  // TODO 测试
  console.log('未指定platform');
}

if (!buildTarget.isWin && !buildTarget.isMac) {
  throw new Error('只支持Windows和Mac');
}

// TODO 测试
console.log(buildTarget);

let subBuildDir = '';
let buildTargetString;
if (buildTarget.isWin) {
  subBuildDir = 'windows';
  buildTargetString = Platform.WINDOWS.createTarget();
} else if (buildTarget.isMac) {
  subBuildDir = 'mac';
  buildTargetString = Platform.MAC.createTarget();
}

const distDir = resolve(process.cwd(), `./dist-electron/${subBuildDir}`);
removeSync(distDir);

const options = {
  appId: 'com.tanglijin.dashboard-template',
  directories: {
    output: distDir,
  },
  extraMetadata: {
    main: './src-electron/main.js',
  },
  win: {
    target: 'nsis',
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
  },
  extraFiles: [
    // 前端编译后文件
    {
      from: resolve(process.cwd(), './dist'),
      to: 'dist',
    },
    // 前端静态文件
    {
      from: resolve(process.cwd(), './public-electron'),
      to: 'public-electron',
    },
  ],
};

build({
  targets: buildTargetString,
  config: options,
})
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
