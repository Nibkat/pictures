const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', () => {
    moveImageToTrash();
});

ipcRenderer.on('delete-image', moveImageToTrash);

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
            moveImageToTrash();
        });
    } else {
        Mousetrap.bind(['mod+backspace'], (e) => {
            moveImageToTrash();
        });
    }
}

/*
 * Deleting an image
 */
function moveImageToTrash() {
    const options = {
        type: 'info',
        title: 'Delete image',
        message: 'Are you sure you want to delete \'' + path.basename(picturePath) + '\'?',
        detail: 'You can restore from the Trash.',
        buttons: ['Move to trash', 'Cancel']
    }
    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            if (fs.existsSync(picturePath)) {
                /*fs.unlink(picturePath, (err) => {
                    if (err) {
                        alert("An error ocurred updating the file" + err.message);
                        console.log(err);
                        return;
                    }

                    setPicture('images/deleted.png');
                });*/

                shell.moveItemToTrash(picturePath);
                setPicture('images/deleted.png');

            } else {
                alert("This file doesn't exist or isn't local, cannot delete");
            }
        }
    });
}

function permaDeleteImage() {
    
}