$(picture).contextmenu(function () { 
    ipcRenderer.send('show-context-menu');
});