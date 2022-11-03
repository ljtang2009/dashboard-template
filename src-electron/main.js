const { app, BrowserWindow } = require('electron');
if (require('electron-squirrel-startup')) {
  app.quit();
  process.exit(0);
}
require('./core/limit-single-instance');
require('./core/router');
const { createWindow: createMainWindow } = require('./window/main.window');
const { createWindow: createSplashWindow } = require('./window/splash.window');

// /**
//  * 初始化
//  * @param { { showMessage: (message: string) => void } } messageHandle
//  */
// async function init(messageHandle) {
//   messageHandle.showMessage('APP is loading resources.');
//   const { logger } = require('./utils/logger');
//   if (app.isPackaged) {
//     messageHandle.showMessage("APP is loading user's files.");
//     const { transUserFilesToAppDirFromTempDir } = require('./utils/updater');
//     try {
//       await transUserFilesToAppDirFromTempDir();
//     } catch (error) {
//       logger.error(error);
//     }
//   }
// }

app.whenReady().then(async () => {
  // createSplashWindow(init);
  createSplashWindow();
});

app.on('activate', () => {
  // macOS 应用通常即使在没有打开任何窗口的情况下也继续运行
  if (BrowserWindow.getAllWindows().length === 0) {
    // 打开主窗口
    createMainWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
