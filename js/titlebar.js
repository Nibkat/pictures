var titlebar = $('#titlebar');

// Buttons
var minimizeButton = $('#minimizeButton');
var closeButton = $('#closeButton');

var autoHideTitlebarInterval;

$('*').mousemove(function (e) {
    clearInterval(autoHideTitlebarInterval);

    if (e.clientY <= titlebar[0].getBoundingClientRect().bottom) {
        titlebar.css('opacity', '1');
        autoHideTitlebarInterval = setInterval(function () {
            titlebar.css('opacity', '0');
        }, 10000);
    } else {
        titlebar.css('opacity', '0');
    }
});

minimizeButton.click(function () {
    currentWindow.minimize();
});

closeButton.click(function () {
    currentWindow.close();
});