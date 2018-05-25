const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', () => {
    moveImageToTrash();
});

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
        Mousetrap.unbind(['mod+del']);
    } else {
        Mousetrap.unbind(['mod+backspace']);
        Mousetrap.unbind(['mod+shift+backspace']);
    }
}

function enableDeleting() {
    deleteButton.style.display = 'inline-block';

    if (os.platform() != 'darwin') {
        Mousetrap.bind(['del'], () => {
            moveImageToTrash();
        });

        Mousetrap.bind(['mod+del'], () => {
            permaDeleteImage();
        });
    } else {
        Mousetrap.bind(['mod+backspace'], () => {
            moveImageToTrash();
        });

        Mousetrap.bind(['mod+shift+backspace'], () => {
            permaDeleteImage();
        });
    }
}

/*
 * Deleting an image
 */
function moveImageToTrash() {
    let deletionLocation = os.platform() === 'darwin' ? 'Trash' : 'Recycling Bin';

    let options = {
        type: 'info',
        message: 'Are you sure you want to delete \'' + path.basename(picturePath) + '\'?',
        detail: 'You can restore from the ' + deletionLocation + '.',
        buttons: ['Move to ' +  deletionLocation, 'Cancel']
    }
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (fs.existsSync(picturePath)) {
                shell.moveItemToTrash(picturePath);
                setPicture('images/deleted.png');

            } else {
                alert("This file doesn't exist or isn't local, cannot delete");
            }
        }
    });
}

function permaDeleteImage() {
    let options = {
        type: 'info',
        message: 'Are you sure you want to permanently delete \'' + path.basename(picturePath) + '\'?',
        detail: 'You won\'t be able to restore this file',
        buttons: ['Permanently delete', 'Cancel']
    }
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (fs.existsSync(picturePath)) {
                fs.unlink(picturePath, (err) => {
                    if (err) {
                        alert("An error ocurred updating the file" + err.message);
                        console.log(err);
                        return;
                    }

                    setPicture('images/deleted.png');
                });

            } else {
                alert("This file doesn't exist or isn't local, cannot delete");
            }
        }
    });
}