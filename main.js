const electron = require('electron');

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  MenuItem
} = electron;

const os = require('os');

const path = require('path');
const url = require('url');

const dockMenu = Menu.buildFromTemplate([{
  label: 'New Window',
  click: () => {
    createWindow();
  }
}]);

let mainWindow;

function createWindow() {
  // Add custom dock menu
  if (os.platform() === 'darwin') {
    app.dock.setMenu(dockMenu);
  }

  // Create window
  mainWindow = new BrowserWindow({
    width: 512,
    height: 512,
    icon: 'images/picture.png',
    resizable: false,
    frame: false
  });

  // Load content
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Remove when closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/*
* Image context menu
*/
const imageContextMenuTemplate = [{
  label: 'Save as',
  accelerator: 'CommandOrControl+S',
  click: () => {
    mainWindow.send('save-image');
  }
}, {
  type: 'separator'
}, {
  label: 'Open',
  accelerator: 'CommandOrControl+O',
  click: () => {
    mainWindow.send('open-image');
  }
}, {
  label: 'Reveal in ' + (os.platform() === 'darwin' ? 'Finder' : 'Explorer'),
  accelerator: 'CommandOrControl+Shift+O',
  click: () => {
    mainWindow.send('open-folder');
  }
}, {
  type: 'separator'
}, {
  label: 'Delete',
  submenu: [{
    label: 'Delete',
    accelerator: os.platform() === 'darwin' ? 'CommandOrControl+Backspace' : 'Delete',
    click: () => {
      mainWindow.send('delete')
    }
  }, {
    label: 'Delete permanently',
    accelerator: os.platform() === 'darwin' ? 'CommandOrControl+Shift+Backspace' : 'CommandOrControl+Delete',
    click: () => {
      mainWindow.send('perma-delete')
    }
  }]
}, {
  type: 'separator'
}, {
  label: 'New window',
  accelerator: 'CommandOrControl+N',
  click: () => {
    createWindow();
  }
}, {
  role: 'quit',
  accelerator: 'CommandOrControl+Q'
}]

const menu = Menu.buildFromTemplate(imageContextMenuTemplate);

/*
 * Context menu ipc
 */
ipcMain.on('show-context-menu', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  menu.popup(win);
});

/*
 * Creating new windows ipc
 */
ipcMain.on('new-window', (e) => {
  createWindow();
});

/*
 * Edit context menu
 */
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

ipcMain.on('show-edit-context-menu', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  editMenu.popup(win);
});