/*
 * Variables
 */
const picture = document.getElementById('picture');
var picturePath;

const urlTextbox = document.getElementById('urlTextbox');
urlTextbox.style.display = 'none';

// Image load event
picture.addEventListener('load', () => {
    let imageLoadEvent = new CustomEvent('imageChange', {
        'detail': {
            'isLocal': fs.existsSync(picturePath)
        }
    });
    
    document.dispatchEvent(imageLoadEvent);
});

// Double clicking
picture.addEventListener('dblclick', showOpenImageDialog);

urlTextbox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        testImage(urlTextbox.value, (url, result) => {
            if (result == 'success') {
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

/*
 * Open the folder containing the current image
 */
function openFolder() {
    shell.showItemInFolder(picturePath);
}

function setPicture(filePath) {
    picture.src = filePath;
    picturePath = filePath;

    let title = path.basename(filePath);
    currentWindow.setTitle(title);
}