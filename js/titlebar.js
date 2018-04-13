const titlebar = $('#titlebar');

/*
* Buttons
*/
const lockButton = $('#lockButton');

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

minimizeButton.click(() => {
    currentWindow.minimize();
});

closeButton.click(() => {
    currentWindow.close();
});