if (require('electron-squirrel-startup')) app.quit();
const { app, BrowserWindow } = require('electron');
const { bootstrap } = require('../dist-api/main');

process.env.ELECTRON_IS_PACKAGED = app.isPackaged ? 'Y' : 'N';

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
  console.log(`http://127.0.0.1:${port}`);
  createWindow({ port });
});
