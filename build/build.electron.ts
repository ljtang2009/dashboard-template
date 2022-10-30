import { outputJsonSync } from 'fs-extra';
import { resolve } from 'path';
import { initEnv } from '@src-utils/env';
const env = initEnv();
// 写入配置， 供electron读取，因为electron打包后不能读取.env
outputJsonSync(resolve(process.cwd(), './src-utils/env.json'), env, { spaces: 2 })
import { build, Platform } from 'electron-builder';
import { parseArgs } from '@build/utils/command';
import { GenericServerOptions } from 'builder-util-runtime';

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

const distDir = resolve(process.cwd(), `./dist-electron/${subBuildDir}`);

const publishServerOptions: GenericServerOptions = {
  provider: 'generic',
  url: `http://127.0.0.1:${process.env['ELECTRON_UPDATE_SERVER_PORT']}`,
};

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
  extraFiles: [
    // 前端编译后文件
    {
      from: resolve(process.cwd(), './dist'),
      to: 'dist',
    },
    // api静态文件
    {
      from: resolve(process.cwd(), './public-api'),
      to: 'public-api',
    },
    // api内置静态文件
    {
      from: resolve(process.cwd(), './public-api-build-in'),
      to: 'public-api-build-in',
    },
  ],
};

build({
  targets: buildTargetString,
  config: options,
  publish: 'always',
})
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
