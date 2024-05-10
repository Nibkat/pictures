// #region functions
function centerWindow() {
    currentWindow.setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));
}

function setWindowSize() {
    picture.removeAttribute('width');
    picture.removeAttribute('height');

    if (picture.height >= screenSize.height) {
        picture.height = screenSize.height - 128;
    }

    if (picture.width >= screenSize.width) {
        picture.width = screenSize.width - 128;
        picture.removeAttribute('height');
    }

    currentWindow.setSize(Math.round(picture.width), Math.round(picture.height));
}

function toggleAlwaysOnTop() {
    let alwaysOnTop = !currentWindow.isAlwaysOnTop();

    currentWindow.setAlwaysOnTop(alwaysOnTop);

    pictureContextMenuTemplate[14].checked = alwaysOnTop;
}
// #endregion

// initial resize & center
setWindowSize();
centerWindow();

// image change event listener
document.addEventListener('pictureChange', (e) => {
    setWindowSize();
    centerWindow();
});

// shortcuts
Mousetrap.bind(['mod+t'], () => {
    toggleAlwaysOnTop();
});