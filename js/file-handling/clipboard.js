const {clipboard, nativeImage} = require('electron');

Mousetrap.bind(['mod+c'], () => {
    copyPicture();
});

Mousetrap.bind(['alt+shift+c'], () => {
    copyPicturePath();
});

function copyPicture() {
    if (picturePath) {
        let image = nativeImage.createFromPath(picturePath);

        clipboard.writeImage(image);
    }
}

function copyPicturePath() {
    if (picturePath) {
        clipboard.writeText(picturePath);
    }
}