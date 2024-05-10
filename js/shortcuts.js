Mousetrap.bind(['mod+o'], function (e) {
    ipc.send('open-file-dialog');
});

/*Mousetrap.bind('ctrl+c', function(e) {
    copyImage();
});*/

Mousetrap.bind(['mod+q'], function (e) {
    remote.getCurrentWindow().close();
});