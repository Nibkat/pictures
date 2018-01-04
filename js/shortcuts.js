Mousetrap.bind('ctrl+o', function(e) {
    ipc.send('open-file-dialog');
});

/*Mousetrap.bind('ctrl+c', function(e) {
    copyImage();
});*/

Mousetrap.bind('ctrl+q', function(e) {
    remote.getCurrentWindow().close();
});