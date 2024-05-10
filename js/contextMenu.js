picture.addEventListener('contextmenu', () => {
    ipcRenderer.send('show-context-menu');
});

document.getElementById('urlTextbox').addEventListener('contextmenu', () => {
    ipcRenderer.send('show-edit-context-menu');
});