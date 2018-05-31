const Menu = remote.Menu;

const pictureContextMenuTemplate = [{
    label: 'Save As',
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
        currentPicture.revealInFolder();
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
    label: 'Copy Image',
    accelerator: 'CommandOrControl+C',
    click: () => {
        copyPicture();
    }
}, {
    label: 'Copy Path',
    accelerator: 'CommandOrControl+Shift+C',
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
        label: 'Delete Permanently',
        accelerator: os.platform() === 'darwin' ? 'CommandOrControl+Shift+Backspace' : 'CommandOrControl+Delete',
        click: () => {
            permaDeleteImage();
        }
    }]
}, {
    type: 'separator'
}, {
    label: 'New Window',
    accelerator: 'CommandOrControl+N',
    click: () => {
        ipcRenderer.send('new-window');
    }
}, {
    label: 'Close Window',
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

var pictureContextMenu = Menu.buildFromTemplate(pictureContextMenuTemplate);

picture.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickPosition = {
        x: e.x,
        y: e.y
    };
    pictureContextMenu.popup(remote.getCurrentWindow());
}, false);