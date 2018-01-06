Mousetrap.bind(['mod+s'], function (e) {
    console.log('save');
});

Mousetrap.bind(['mod+o'], function (e) {
    showOpenImageDialog();
});

/*Mousetrap.bind('ctrl+c', function(e) {
    copyImage();
});*/

Mousetrap.bind(['mod+q'], function (e) {
    currentWindow.close();
});