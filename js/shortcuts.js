Mousetrap.bind(['mod+s'], (e) => {
    console.log('save');
});

Mousetrap.bind(['mod+o'], (e) => {
    showOpenImageDialog();
});

Mousetrap.bind(['mod+shift+o'], (e) => {
    openFolder();
});

/*Mousetrap.bind('ctrl+c', (e) => {
    copyImage();
});*/

if (os.platform() != 'darwin') {
    Mousetrap.bind(['mod+q'], (e) => {
        currentWindow.close();
    });
}