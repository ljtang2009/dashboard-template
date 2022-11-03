const { app } = require('electron');
const path = require('path');
const { logger } = require('../utils/logger');
const { transUserFilesToAppDirFromTempDir } = require('../utils/updater');

/**
 * 初始化
 * @param { { showMessage: (message: string) => void } } splashHandle
 */
exports.bootstrap = async function (splashHandle) {
  // // TODO 获取语言环境 实现多语言 参考 app.getLocale()
  // splashHandle.showMessage('APP is loading resources.');

  // if (app.isPackaged) {
  //   splashHandle.showMessage("APP is loading user's files.");
  //   await transUserFilesToAppDirFromTempDir();
  // }

  // const distApiPath = path.resolve(process.cwd(), './dist-api/src-api/main');
  // const { bootstrap } = require(distApiPath);
  // const { port } = await bootstrap();
  // console.log(`http://127.0.0.1:${port}`);
};
