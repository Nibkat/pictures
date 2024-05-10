const electron = require('electron');
const fs = require('fs');

const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = electron;

const path = require('path');
const url = require('url');

const dockMenu = Menu.buildFromTemplate([{
  label: 'New Window',
  click: () => {
    createWindow();
  }
}]);

if (process.platform === 'win32') {
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Opens a new window'
    }
  ]);
}

let windows = [];

function createWindow() {
  let window;

  // Create window
  window = new BrowserWindow({
    width: 512,
    height: 512,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    resizable: false,
    frame: false
  });

  // Load content
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Remove when closed
  window.on('closed', () => {
    window = null;
    windows.pop(window);
  });

  window.on('ready-to-show', () => {
    createContextMenu(window);
  });

  windows.push(window);
}

app.on('ready', () => {
  // Add custom dock menu
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu);
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (windows.length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  let tempDir = __dirname + '/temp';

  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(function (file, index) {
      let curPath = tempDir + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(tempDir);
  }
})

/*
 * IPC events
 */
ipcMain.on('new-window', (e) => {
  createWindow();
});

ipcMain.on('quit', () => {
  app.quit();
})

/*
 * Edit context menu
 */
const simpleEditMenu = Menu.buildFromTemplate([{
  role: 'cut',
  accelerator: 'CommandOrControl+X'
}, {
  role: 'copy',
  accelerator: 'CommandOrControl+C'
}, {
  role: 'paste',
  accelerator: 'CommandOrControl+V'
}]);

ipcMain.on('show-edit-context-menu', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  simpleEditMenu.popup(win);
});