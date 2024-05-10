/*
 * Variables
 */
const picture = document.getElementById('picture');
var currentPicture = new Picture();

const urlTextbox = document.getElementById('urlTextbox');
urlTextbox.style.display = 'none';

// Image load event
picture.addEventListener('load', () => {
    let pictureLoadEvent = new CustomEvent('pictureChange');

    document.dispatchEvent(pictureLoadEvent);
});

// Double clicking
picture.addEventListener('dblclick', showOpenImageDialog);

urlTextbox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        testImage(urlTextbox.value, (url, result) => {
            if (result === 'success') {
                setPicture(url);

                fadeOut(urlTextbox, 250);
                urlTextbox.value = '';
            } else {
                dialog.showErrorBox('Invalid image', 'Timed out or the url is not a valid image');
            }
        });
    }
});

/*
 * Showing the image dialog
 */
function showOpenImageDialog() {
    dialog.showOpenDialog({
        filters: [{
            name: 'Image',
            extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg', 'bmp', 'webp', 'tiff', 'ico']
        }]
    }, (files) => {
        if (files) {
            setPicture(files[0]);
        }
    });
}

setPicture('./assets/images/placeholder.png');

function setPicture(filePath) {
    currentPicture = new Picture(filePath);

    picture.src = currentPicture.path;

    let title = path.basename(currentPicture.path);
    currentWindow.setTitle(title);
}