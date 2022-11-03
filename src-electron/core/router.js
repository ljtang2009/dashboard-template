const { ipcMain } = require('electron');

const REQUEST_CHANNEL = 'handleRequest';

ipcMain.handle(REQUEST_CHANNEL, async (event, args) => {
  return 'aa';
});
