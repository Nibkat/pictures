const {
    clipboard,
    nativeImage
} = require('electron');

Mousetrap.bind(['mod+v'], () => {
    pastePicture();
});

Mousetrap.bind(['mod+c'], () => {
    copyPicture();
});

Mousetrap.bind(['alt+shift+c'], () => {
    copyPicturePath();
});

var pastedImageCount = 0;

function pastePicture() {
    let availableFormats = clipboard.availableFormats();
    
    if (availableFormats.includes('image/png') || availableFormats.includes('image/jpg')) {
        let image = clipboard.readImage();

        let tempDir = __dirname + "\\temp";
        let fileDir = tempDir + '\\unknown' + pastedImageCount + '.jpg';

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        let buffer = image.toJPEG(100);

        fs.writeFile(fileDir, buffer, "binary", function (err) {
            if (err) {
                console.log(err);
            } else {
                setPicture(fileDir);

                pastedImageCount++;
            }
        });
    } else if (availableFormats.includes('text/plain')) {
        let clipboardText = clipboard.readText();

        testImage(clipboardText, (url, result) => {
            if (result === 'success') {
                setPicture(url);
            } else {
                dialog.showErrorBox('Invalid image', 'Timed out or the url is not a valid image');
            }
        });
    }
}

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