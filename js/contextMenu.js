$(picture).contextmenu(() => {
    ipcRenderer.send('show-context-menu');
});

$('#urlTextbox').contextmenu(() => {
    ipcRenderer.send('show-edit-context-menu');
});