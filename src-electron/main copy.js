const { app, BrowserWindow } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const { oneKeyUpdate, transUserFilesToAppDirFromTempDir } = require('./utils/updater');
const { logger } = require('./utils/logger');
const path = require('path');
// const distApiPath = path.resolve(process.cwd(), './dist-api/src-api/main');
// const distApiPath = path.resolve(process.cwd(), './dist-api-encrypt/src-api/main');
// const { bootstrap } = require(distApiPath);

const createWindow = ({ port }) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // win.loadFile('index.html');
  win.loadURL(`http://127.0.0.1:${port}`);
};

exports.launch = (options) => {
  app.whenReady().then(async () => {
    if (app.isPackaged) {
      try {
        await transUserFilesToAppDirFromTempDir();
      } catch (error) {
        logger.error(error);
      }
    }
    const { port } = await options.apiBootstrap();
    createWindow({ port });
    if (app.isPackaged) {
      setTimeout(() => {
        oneKeyUpdate();
      }, 1000);
    }
  });
};
