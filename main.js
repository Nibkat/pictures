const electron = require('electron');
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

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
    mainWindow = null;
  });
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+O', function (event) {
    openImageDialog();
  });

  globalShortcut.register('CommandOrControl+Q', function () {
    app.quit();
  });
}

function openImageDialog() {
  dialog.showOpenDialog({
    filters: [
      {
        name: 'Image',
        extensions: ['jpg', 'png', 'gif', 'svg', 'bmp', 'webp', 'tiff', 'ico']
      }
    ]
  }, function (files) {
    if (files) {
      mainWindow.send('selected-image', files[0]);
    }
  });
}

app.on('ready', function () {
  createWindow();

  registerShortcuts();
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
  openImageDialog();
});