Mousetrap.bind(['mod+s'], (e) => {
    console.log('save');
});

Mousetrap.bind(['mod+o'], (e) => {
    showOpenImageDialog();
});

Mousetrap.bind(['mod+shift+o'], (e) => {
    openFolder();
});

Mousetrap.bind(['del'], (e) => {
    deleteImage();
});

/*Mousetrap.bind('ctrl+c', (e) => {
    copyImage();
});*/

Mousetrap.bind(['mod+q'], (e) => {
    currentWindow.close();
});