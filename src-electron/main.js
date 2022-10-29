if (require('electron-squirrel-startup')) app.quit();
const { register: registerModuleAlias } = require('./core/module-alias');
registerModuleAlias();
const { app, BrowserWindow } = require('electron');
const { bootstrap } = require('@dist-api/main');
const { update } = require('@src-electron/utils/updater');

const createWindow = ({ port }) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // win.loadFile('index.html');
  win.loadURL(`http://127.0.0.1:${port}`);
};

app.whenReady().then(async () => {
  const { port } = await bootstrap();
  createWindow({ port });
  setTimeout(() => {
    update();
  }, 1000);
});
