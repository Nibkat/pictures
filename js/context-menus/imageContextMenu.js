const Menu = remote.Menu;

const imageContextMenuTemplate = [{
    label: 'Save as',
    accelerator: 'CommandOrControl+S',
    click: () => {
        console.log('save');
    }
}, {
    type: 'separator'
}, {
    label: 'Open',
    accelerator: 'CommandOrControl+O',
    click: () => {
        showOpenImageDialog();
    }
}, {
    label: 'Reveal in ' + (os.platform() === 'darwin' ? 'Finder' : 'Explorer'),
    accelerator: 'CommandOrControl+Shift+O',
    click: () => {
        openFolder();
    }
}, {
    type: 'separator'
}, {
    label: 'Paste',
    accelerator: 'CommandOrControl+V',
    click: () => {
        pastePicture();
    }
}, {
    label: 'Copy',
    accelerator: 'CommandOrControl+C',
    click: () => {
        copyPicture();
    }
}, {
    label: 'Copy Path',
    accelerator: 'Alt+Shift+C',
    click: () => {
        copyPicturePath();
    }
}, {
    type: 'separator'
}, {
    label: 'Delete',
    submenu: [{
        label: 'Delete',
        accelerator: os.platform() === 'darwin' ? 'CommandOrControl+Backspace' : 'Delete',
        click: () => {
            moveImageToTrash();
        }
    }, {
        label: 'Delete permanently',
        accelerator: os.platform() === 'darwin' ? 'CommandOrControl+Shift+Backspace' : 'CommandOrControl+Delete',
        click: () => {
            permaDeleteImage();
        }
    }]
}, {
    type: 'separator'
}, {
    label: 'New window',
    accelerator: 'CommandOrControl+N',
    click: () => {
        ipcRenderer.send('new-window');
    }
}, {
    label: 'Close window',
    accelerator: 'CommandOrControl+W',
    click: () => {
        currentWindow.close();
    }
}, {
    role: 'toggledevtools',
    accelerator: 'CommandOrControl+Shift+I'
}, {
    type: 'separator'
}, {
    role: 'quit',
    accelerator: 'CommandOrControl+Q'
}];

const menu = Menu.buildFromTemplate(imageContextMenuTemplate);

picture.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    rightClickPosition = { x: e.x, y: e.y }
    menu.popup(remote.getCurrentWindow())
}, false);