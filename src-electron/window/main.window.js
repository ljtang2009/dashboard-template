const { BrowserWindow } = require('electron');

/**
 * 创建主窗口
 * @param { Object } option
 * @param { string } option.apiServerUrl
 * @param { Object } option.splashWin
 */
exports.createWindow = (option) => {
  const win = new BrowserWindow({
    show: false,
  });
  win.loadURL(option.apiServerUrl);
  win.once('ready-to-show', () => {
    option.splashWin.close();
    win.show();
  });
};
