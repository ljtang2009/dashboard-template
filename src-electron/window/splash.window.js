const { BrowserWindow } = require('electron');
const path = require('path');

exports.createWindow = () => {
  return new Promise((resolve, reject) => {
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: path.resolve(__dirname, '../preload/default.js'),
      },
    });
    win.loadFile(path.resolve(__dirname, '../html/splash.html'));
    win.once('ready-to-show', () => {
      win.show();
      resolve(win);
    });
  });
};

/**
 * 显示信息
 * @param { Object } option
 * @param { Object } option.splashWin
 * @param { string } option.message
 */
exports.showMessage = (option) => {
  const channel = 'splash-window/show-message';
  option.splashWin.webContents.send(channel, { message: option.message });
};
