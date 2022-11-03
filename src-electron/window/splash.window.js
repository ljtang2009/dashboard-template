const { BrowserWindow } = require('electron');
const path = require('path');

exports.createWindow = () => {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    show: false,
    // frame: false,
    // transparent: true,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/default.js'),
    },
  });
  win.loadFile(path.resolve(__dirname, '../html/splash.html'));
  win.once('ready-to-show', () => {
    win.show();
    // initFunction({ showMessage });
  });

  // function showMessage(message) {
  //   const channel = 'splash-window/show-message';
  //   win.webContents.send(channel, { message });
  //   //
  // }
  return win;
};
