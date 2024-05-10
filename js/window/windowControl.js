/*
 * Window control win
 */
const windowControlWin = document.getElementById('windowControlWin');

const minimizeButtonWin = document.getElementById('minimizeButtonWin');
const closeButtonWin = document.getElementById('closeButtonWin');

/*
 * Window control mac
 */
const windowControlMac = document.getElementById('windowControlMac');

const minimizeButtonMac = document.getElementById('minimizeButtonMac');
const maximizeButtonMac = document.getElementById('maximizeButtonMac');
const closeButtonMac = document.getElementById('closeButtonMac');

/*
 * OS specific titlebar
 */
if (os.platform() === 'darwin') {
    imageControl.style.cssFloat = 'right';

    windowControlWin.style.display = 'none';
    windowControlMac.style.display = 'inline';

    currentWindow.on('blur', () => {
        minimizeButtonMac.style.background = '#e0e0e0';
        //maximizeButtonMac.style.background = '#e0e0e0';
        closeButtonMac.style.background = '#e0e0e0';
    });

    currentWindow.on('focus', () => {
        minimizeButtonMac.style.background = '#f8bd34';
        //maximizeButtonMac.style.background = '#43cb44';
        closeButtonMac.style.background = '#ea5b53';
    });
} else {
    imageControl.style.cssFloat = 'left';

    windowControlWin.style.display = 'inline';
    windowControlMac.style.display = 'none';
}

/*
 * Window control functionality
 */
minimizeButtonWin.addEventListener('click', () => {
    currentWindow.minimize();
});

minimizeButtonMac.addEventListener('click', () => {
    currentWindow.minimize();
});

closeButtonWin.addEventListener('click', () => {
    currentWindow.close();
});

closeButtonMac.addEventListener('click', () => {
    currentWindow.close();
});