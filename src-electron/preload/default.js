const { contextBridge, ipcRenderer } = require('electron');
const REQUEST_CHANNEL = 'handleRequest';
const handleRequest = async (args) => {
  return await ipcRenderer.invoke(REQUEST_CHANNEL, args);
};
const handleReceiveMessage = (channel, func) => {
  ipcRenderer.on(channel, (event, ...args) => func(...args));
};
contextBridge.exposeInMainWorld('electronAPI', {
  handleRequest,
  handleReceiveMessage,
});
