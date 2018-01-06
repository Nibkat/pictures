$(picture).contextmenu(function () {
    ipcRenderer.send('show-context-menu');
});

$('#urlTextbox').contextmenu(function () {
    ipcRenderer.send('show-edit-context-menu');
});