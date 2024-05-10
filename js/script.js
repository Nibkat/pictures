var picture = $('#picture');

var urlTextBox = $('#urlTextBox');
urlTextBox.hide();

var selectImage = $('#select-image');
var openUrl = $('#open-url');

centerWindow();
setWindowSize();

selectImage.click(function (event) {
    ipc.send('open-file-dialog');
});

openUrl.click(function () {
    urlTextBox.fadeToggle('fast');
});

ipc.on('selected-image', function (event, path) {
    picture.attr('src', `${path}`);
});

picture.on('load', function () {
    setWindowSize();
    centerWindow();
});

picture.dblclick(function () {
    ipc.send('open-file-dialog');
});

urlTextBox.keypress(function (e) {
    if (e.keyCode == 13) {
        testImage(urlTextBox.val(), function (url, result) {
            if (result == 'success') {
                picture.attr('src', url);
                urlTextBox.fadeOut('fast');
                urlTextBox.val('');
            } else {
                alert(url + ' is not a valid image');
            }
        });
    }
});

function centerWindow() {
    remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width() / 2), Math.round(screenSize.height / 2 - picture.height() / 2));
}

function setWindowSize() {
    picture.width('');
    picture.height('');

    if (picture.height() >= screenSize.height) {
        picture.height(screenSize.height - 128);
    }
    if (picture.width() >= screenSize.width) {
        picture.width(screenSize.width - 128);
        picture.removeAttr('height');
    }

    remote.getCurrentWindow().setSize(Math.round(picture.width()), Math.round(picture.height()));
}

function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    let timedOut = false,
        timer;
    let img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'error');
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'success');
        }
    };
    img.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(url, 'timeout');
    }, timeout);
}