if (require('electron-squirrel-startup')) app.quit();
const { app, BrowserWindow } = require('electron');
const { bootstrap } = require('../dist-api/src-api/main');
const { oneKeyUpdate, transUserFilesToAppDirFromTempDir } = require('./utils/updater');
const { logger } = require('./utils/logger');

const createWindow = ({ port }) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // win.loadFile('index.html');
  win.loadURL(`http://127.0.0.1:${port}`);
};

app.whenReady().then(async () => {
  if (app.isPackaged) {
    try {
      await transUserFilesToAppDirFromTempDir();
    } catch (error) {
      logger.error(error);
    }
  }
  const { port } = await bootstrap();
  createWindow({ port });
  setTimeout(() => {
    oneKeyUpdate();
  }, 1000);
});
