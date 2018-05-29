const {
    clipboard,
    nativeImage
} = require('electron');

var pastedImageCount = 0;

/*
 * Shortcuts
 */
Mousetrap.bind(['mod+v'], () => {
    pastePicture();
});

Mousetrap.bind(['mod+c'], () => {
    copyPicture();
});

Mousetrap.bind(['mod+shift+c'], () => {
    copyPicturePath();
});

/*
 * Functions
 */
function pastePicture() {
    let availableFormats = clipboard.availableFormats();

    if (availableFormats.includes('image/png') || availableFormats.includes('image/jpg')) {
        let tempDir = __dirname + "\\temp";

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        let fileDir = tempDir + '\\unknown' + pastedImageCount + '.jpg';

        let image = clipboard.readImage();
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