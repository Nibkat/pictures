const titlebar = document.getElementById('titlebar');

/*
 * Image control
 */
const imageControl = document.getElementById('imageControl');

const lockButton = document.getElementById('lockButton');
const openImageButton = document.getElementById('openImageButton');
const openUrlButton = document.getElementById('openUrlButton');

/*
 * Other variables
 */
var locked = false;
var autoHideTitlebarInterval;

Mousetrap.bind(['mod+l'], () => {
    toggleTitlebarLock();
});

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
 * Image control functionality
 */
lockButton.addEventListener('click', () => {
    toggleTitlebarLock();
});

openImageButton.addEventListener('click', showOpenImageDialog);

openImageButton.addEventListener('mousedown', () => {
    if (os.platform() === 'darwin') {
        openImageButton.style.color = '#88CFF7';
    } else {
        openImageButton.style.color = '#F9D774';
    }
});

openImageButton.addEventListener('mouseup', () => {
    openImageButton.style.color = '#fff';
});

openUrlButton.addEventListener('click', () => {
    fadeToggle(urlTextbox, 250);
});

function toggleTitlebarLock() {
    locked = !locked;

    if (locked) {
        lockButton.style.color = '#f8bd34';
        titlebar.style.opacity = 1;
    } else {
        lockButton.style.color = '#fff';
    }
}