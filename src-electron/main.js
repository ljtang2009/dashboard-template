const { app, BrowserWindow } = require('electron');
if (require('electron-squirrel-startup')) {
  app.quit();
  process.exit(0);
}
require('./core/limit-single-instance');
require('./core/router');
const path = require('path');
const { createWindow: createMainWindow } = require('./window/main.window');
const { createWindow: createSplashWindow, showMessage: showSplashMessage } = require('./window/splash.window');
const { transUserFilesToAppDirFromTempDir } = require('./utils/updater');
const srcApiDirPath = app.isPackaged ? '../src-api/main' : path.resolve(process.cwd(), './dist-api/src-api/main');
const { bootstrap: apiBootstrap } = require(srcApiDirPath);

/**
 * 创建主窗口
 * @param { Object } option
 * @param { Object } option.splashWin
 */
async function getReadyForMainWindow(option) {
  showSplashMessage({ splashWin: option.splashWin, message: 'Loading resources.' });
  if (app.isPackaged) {
    showSplashMessage({ splashWin: option.splashWin, message: "Loading user's files." });
    await transUserFilesToAppDirFromTempDir();
  }
  showSplashMessage({ splashWin: option.splashWin, message: 'Launching api server.' });
  const { port } = await apiBootstrap();
  return {
    apiServerUrl: `http://127.0.0.1:${port}`,
  };
}

app.whenReady().then(async () => {
  // createSplashWindow(init);
  const splashWin = await createSplashWindow();
  const { apiServerUrl } = await getReadyForMainWindow({ splashWin });
  createMainWindow({ apiServerUrl, splashWin });
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
