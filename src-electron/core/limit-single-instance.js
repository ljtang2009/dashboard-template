const { app, BrowserWindow } = require('electron');

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}
app.on('second-instance', () => {
  // 当运行第二个实例时,将会聚焦到myWindow这个窗口
  // TODO 尽可能精确找到要聚焦的窗口
  const winList = BrowserWindow.getAllWindows();
  if (winList && winList.length > 0) {
    if (winList[0].isMinimized()) winList[0].restore();
    winList[0].focus();
  }
});
