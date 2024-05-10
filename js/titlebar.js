const titlebar = $('#titlebar');

/*
* Button variables
*/
const lockButton = $('#lockButton');
const openImageButton = $('#openImageButton');
const openUrlButton = $('#openUrlButton');
const deleteButton = $('#deleteButton');

const minimizeButton = $('#minimizeButton');
const closeButton = $('#closeButton');

/*
* Other variables
*/
var locked = false;
var autoHideTitlebarInterval;

/*
* Showing & hiding the titlebar
*/
$('*').mousemove((e) => {
    if (!locked) {
        clearInterval(autoHideTitlebarInterval);

        if (e.clientY <= titlebar[0].getBoundingClientRect().bottom + 5) {
            titlebar.css('opacity', '1');
            autoHideTitlebarInterval = setInterval(() => {
                if (!locked) {
                    titlebar.css('opacity', '0');
                }
            }, 10000);
        } else {
            titlebar.css('opacity', '0');
        }
    }
});

/*
* Button functionality
*/
lockButton.click(() => {
    locked = !locked;

    if (locked) {
        lockButton.css('color', '#f8bd34');
        titlebar.css('opacity', '1');
    } else {
        lockButton.css('color', '#fff');
    }
});

openImageButton.click(showOpenImageDialog);

openUrlButton.click(() => {
    urlTextbox.fadeToggle('fast');
});

deleteButton.click(() => {
    deleteImage();
});

minimizeButton.click(() => {
    currentWindow.minimize();
});

closeButton.click(() => {
    currentWindow.close();
});