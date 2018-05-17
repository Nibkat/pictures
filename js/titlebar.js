const titlebar = document.getElementById('titlebar');

/*
* Buttons variables
*/
const lockButton = document.getElementById('lockButton');
const openImageButton = document.getElementById('openImageButton');
const openUrlButton = document.getElementById('openUrlButton');
const deleteButton = document.getElementById('deleteButton');

const minimizeButton = document.getElementById('minimizeButtonWin');
const closeButton = document.getElementById('closeButtonWin');

/*
* Other variables
*/
var locked = false;
var autoHideTitlebarInterval;

/*
* Showing & hiding the titlebar
*/
document.addEventListener('mousemove', (e) => {
    if (!locked) {
        clearInterval(autoHideTitlebarInterval);

        if (e.clientY <= titlebar.getBoundingClientRect().bottom + 5) {
            titlebar.style.opacity = 1;
            autoHideTitlebarInterval = setInterval(() => {
                if (!locked) {
                    titlebar.style.opacity = 0;
                }
            }, 10000);
        } else {
            titlebar.style.opacity = 0;
        }
    }
});

/*
* Button functionality
*/
lockButton.addEventListener('click', () => {
    locked = !locked;

    if (locked) {
        lockButton.style.color = '#f8bd34';
        titlebar.style.opacity = 1;
    } else {
        lockButton.style.color = '#fff';
    }
});

openImageButton.addEventListener('click', showOpenImageDialog);

openUrlButton.addEventListener('click', () => {
    fadeToggle(urlTextbox, 250);
});

deleteButton.addEventListener('click', () => {
    deleteImage();
});

minimizeButton.addEventListener('click', () => {
    currentWindow.minimize();
});

closeButton.addEventListener('click', () => {
    currentWindow.close();
});