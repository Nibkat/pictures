const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', () => {
    deleteImage();
});

ipcRenderer.on('delete-image', deleteImage);

document.addEventListener('imageChange', (e) => {
    if (e.detail.isLocal) {
        enableDeleting();
    } else {
        disableDeleting();
    }
});

// Initially disable deleting
disableDeleting();

/*
* Enabling and disabling deleting
*/
function disableDeleting() {
    deleteButton.style.display = 'none';

    if (os.platform() != 'darwin') {
        Mousetrap.unbind(['del']);
    } else {
        Mousetrap.unbind(['mod+backspace']);
    }
}

function enableDeleting() {
    deleteButton.style.display = 'inline-block';

    if (os.platform() != 'darwin') {
        Mousetrap.bind(['del'], (e) => {
            deleteImage();
        });
    } else {
        Mousetrap.bind(['mod+backspace'], (e) => {
            deleteImage();
        });
    }
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