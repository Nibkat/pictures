Mousetrap.bind(['mod+s'], function (e) {
    console.log('save');
});

Mousetrap.bind(['mod+o'], function (e) {
    showOpenImageDialog();
});

Mousetrap.bind(['mod+shift+o'], function (e) {
    openFolder();
});

Mousetrap.bind(['del'], function (e) {
    deleteImage();
});

/*Mousetrap.bind('ctrl+c', function(e) {
    copyImage();
});*/

Mousetrap.bind(['mod+q'], function (e) {
    currentWindow.close();
});