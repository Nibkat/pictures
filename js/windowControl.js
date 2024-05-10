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
const closeButtonMac = document.getElementById('closeButtonMac');

/*
* OS specific titlebar
*/
if (os.platform() === 'darwin') {
    imageControl.style.cssFloat = 'right';

    windowControlWin.style.display = 'none';
    windowControlMac.style.display = 'inline';
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

closeButtonWin.addEventListener('click', () => {
    currentWindow.close();
});