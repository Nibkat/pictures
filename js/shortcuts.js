Mousetrap.bind(['mod+o'], function (e) {
    ipcRenderer.send('open-file-dialog');
});

/*Mousetrap.bind('ctrl+c', function(e) {
    copyImage();
});*/

Mousetrap.bind(['mod+q'], function (e) {
    currentWindow.close();
});