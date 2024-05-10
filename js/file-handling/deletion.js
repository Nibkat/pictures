const deleteButton = document.getElementById('deleteButton');
const deletedPicture = './assets/images/deleted.png';

deleteButton.addEventListener('click', () => {
    moveImageToTrash();
});

document.addEventListener('pictureChange', (e) => {
    if (currentPicture.isLocal() && !currentPicture.isAsset()) {
        enableDeleting();
    } else {
        disableDeleting();
    }
});

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

    pictureContextMenuTemplate[9].enabled = false;
    pictureContextMenu = Menu.buildFromTemplate(pictureContextMenuTemplate);
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

    pictureContextMenuTemplate[9].enabled = true;
    pictureContextMenu = Menu.buildFromTemplate(pictureContextMenuTemplate);
}

/*
 * Deleting an image
 */
function moveImageToTrash() {
    let deletionLocation = os.platform() === 'darwin' ? 'Trash' : 'Recycling Bin';

    let options = {
        type: 'info',
        message: 'Are you sure you want to delete \'' + path.basename(currentPicture.path) + '\'?',
        detail: 'You can restore from the ' + deletionLocation + '.',
        buttons: ['Move to ' + deletionLocation, 'Cancel']
    };
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (currentPicture.moveToTrash()) {
                setPicture(deletedPicture);
            }
        }
    });
}

function permaDeleteImage() {
    let options = {
        type: 'info',
        message: 'Are you sure you want to permanently delete \'' + path.basename(currentPicture.path) + '\'?',
        detail: 'You won\'t be able to restore this file',
        buttons: ['Permanently delete', 'Cancel']
    };
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (currentPicture.permaDelete()) {
                setPicture(deletedPicture);
            }
        }
    });
}