const electron = require('electron');
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const globalShortcut = electron.globalShortcut;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 512,
    height: 512,
    icon: 'images/picture.png',
    resizable: false,
    frame: false
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', function () {
  createWindow();

  globalShortcut.register('CommandOrControl+Q', function () {
    app.quit();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (files) {
    if (files)
      event.sender.send('selected-directory', files);
  });
});