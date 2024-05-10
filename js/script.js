/*
 * Variables
 */
const picture = document.getElementById('picture');

const urlTextbox = document.getElementById('urlTextbox');
urlTextbox.style.display = 'none';

// Image load event
picture.addEventListener('load', () => {
    let imageLoadEvent = new CustomEvent('imageChange', {
        'detail': {
            'isLocal': fs.existsSync(unescape(picture.src.replace('file:///', '')))
        }
    });
    
    document.dispatchEvent(imageLoadEvent);
});

// Double clicking
picture.addEventListener('dblclick', showOpenImageDialog);

ipcRenderer.on('save-image', () => {
    console.log('save');
});

ipcRenderer.on('open-image', showOpenImageDialog);
ipcRenderer.on('open-folder', openFolder);
ipcRenderer.on('delete-image', deleteImage);

urlTextbox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        testImage(urlTextbox.value, (url, result) => {
            if (result == 'success') {
                picture.src = url;
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
            picture.src = files[0];
        }
    });
}

/*
 * Open the folder containing the current image
 */
function openFolder() {
    shell.showItemInFolder(picture.src);
}

/*
 * Deleting an image
 */
function deleteImage() {
    const options = {
        type: 'info',
        title: 'Delete image',
        message: "Are you sure you want to permanently delete this image?",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            let fileName = unescape(picture.src.replace('file:///', ''));

            if (fs.existsSync(fileName)) {
                fs.unlink(fileName, (err) => {
                    if (err) {
                        alert("An error ocurred updating the file" + err.message);
                        console.log(err);
                        return;
                    }

                    picture.src = 'images/deleted.png';
                });
            } else {
                alert("This file doesn't exist or isn't local, cannot delete");
            }
        }
    });
}