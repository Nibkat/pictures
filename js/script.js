const picture = $('#picture');

const urlTextbox = $('#urlTextbox');
urlTextbox.hide();

const openImageButton = $('#openImageButton');
const openUrlButton = $('#openUrlButton');
const deleteButton = $('#deleteButton');

openImageButton.click(showOpenImageDialog);

openUrlButton.click(() => {
    urlTextbox.fadeToggle('fast');
});

deleteButton.click(() => {
    deleteImage();
});

picture.on('load', () => {
    setWindowSize();
    centerWindow();
});

picture.dblclick(showOpenImageDialog);

ipcRenderer.on('save-image', () => {
    console.log('save');
});

ipcRenderer.on('open-image', showOpenImageDialog);
ipcRenderer.on('open-folder', openFolder);
ipcRenderer.on('delete-image', deleteImage);

urlTextbox.keypress((e) => {
    if (e.keyCode == 13) {
        testImage(urlTextbox.val(), (url, result) => {
            if (result == 'success') {
                picture.attr('src', url);
                urlTextbox.fadeOut('fast');
                urlTextbox.val('');

                deleteButton.hide();
            } else {
                dialog.showErrorBox('Invalid image', 'URL is not a valid image');
            }
        });
    }
});

function showOpenImageDialog() {
    dialog.showOpenDialog({
        filters: [{
            name: 'Image',
            extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg', 'bmp', 'webp', 'tiff', 'ico']
        }]
    }, (files) => {
        if (files) {
            picture.attr('src', files[0]);
            deleteButton.show();
        }
    });
}

function openFolder() {
    shell.showItemInFolder(picture.attr('src'));
}

function deleteImage() {
    const options = {
        type: 'info',
        title: 'Delete image',
        message: "Are you sure you want to permanently delete this image?",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (fs.existsSync(picture.attr('src'))) {
                fs.unlink(picture.attr('src'), (err) => {
                    if (err) {
                        alert("An error ocurred updating the file" + err.message);
                        console.log(err);
                        return;
                    }

                    picture.attr('src', 'images/deleted.png');
                });
            } else {
                alert("This file doesn't exist or isn't local, cannot delete");
            }
        }
    });
}