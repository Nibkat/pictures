Mousetrap.bind(['mod+s'], (e) => {
    console.log('save');
});

Mousetrap.bind(['mod+o'], (e) => {
    showOpenImageDialog();
});

Mousetrap.bind(['mod+shift+o'], (e) => {
    openFolder();
});

if (os.platform() != 'darwin') {
    Mousetrap.bind(['del'], (e) => {
        deleteImage();
    });
} else {
    Mousetrap.bind(['mod+backspace'], (e) => {
        deleteImage();
    });
}

/*Mousetrap.bind('ctrl+c', (e) => {
    copyImage();
});*/

if (os.platform() != 'darwin') {
    Mousetrap.bind(['mod+q'], (e) => {
        currentWindow.close();
    });
}