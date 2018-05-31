document.getElementById('urlTextbox').addEventListener('contextmenu', () => {
    ipcRenderer.send('show-edit-context-menu');
});