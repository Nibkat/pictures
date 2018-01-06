const electron = require('electron');

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  MenuItem
} = electron;

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
    mainWindow = null;
  });
}

app.on('ready', function () {
  createWindow();
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

// Context menu
const menu = new Menu();

// Context menu items
const saveImage = new MenuItem({
  label: 'Save as',
  accelerator: 'CommandOrControl+S'
});
saveImage.click = function () {
  mainWindow.send('save-image');
}

const openMenuItem = new MenuItem({
  label: 'Open',
  accelerator: 'CommandOrControl+O'
});
openMenuItem.click = function () {
  mainWindow.send('open-image');
}

const openFolderItem = new MenuItem({
  label: 'Open folder',
  accelerator: 'CommandOrControl+Shift+O'
});
openFolderItem.click = function () {
  mainWindow.send('open-folder');
}

const deleteImageItem = new MenuItem({
  label: 'Delete',
  accelerator: 'CommandOrControl+D'
});
deleteImageItem.click = function () {
  mainWindow.send('delete-image');
}

const quitMenuItem = new MenuItem({
  role: 'quit',
  accelerator: 'CommandOrControl+Q'
});

// Append menu items
menu.append(saveImage);
menu.append(new MenuItem({
  type: 'separator'
}));
menu.append(openMenuItem);
menu.append(openFolderItem);
menu.append(new MenuItem({
  type: 'separator'
}));
menu.append(deleteImageItem);
menu.append(new MenuItem({
  type: 'separator'
}));
menu.append(quitMenuItem);

// Context menu ipc
ipcMain.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup(win);
});

// Edit context menu
const editMenu = new Menu();

editMenu.append(new MenuItem({
  role: 'cut',
  accelerator: 'CommandOrControl+X'
}));
editMenu.append(new MenuItem({
  role: 'copy',
  accelerator: 'CommandOrControl+C'
}));
editMenu.append(new MenuItem({
  role: 'paste',
  accelerator: 'CommandOrControl+V'
}));

ipcMain.on('show-edit-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender);
  editMenu.popup(win);
});