const {
    electron,
    remote,
    ipcRenderer,
    shell,
    screen,
    clipboard,
    nativeImage
} = require('electron');

const os = require('os');
const fs = require('fs');
const path = require('path');

const dialog = remote.dialog;
const Menu = remote.Menu;
const currentWindow = remote.getCurrentWindow();

const screenSize = screen.getPrimaryDisplay().size;