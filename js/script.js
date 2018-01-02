var picture = document.getElementById('picture');

centerWindow();
setWindowSize();

$('#minimizeButton').click(function () {
    remote.getCurrentWindow().minimize();
});

$('#closeButton').click(function () {
    remote.getCurrentWindow().close();
});

$('#select-image').click(function (event) {
    ipc.send('open-file-dialog');
});

ipc.on('selected-image', function (event, path) {
    picture.src = `${path}`;
});

$('#picture').on('load', function () {
    setWindowSize();
    centerWindow();
});

$('#picture').dblclick(function() {
    ipc.send('open-file-dialog');
});

function centerWindow() {
    remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));
}

function setWindowSize() {
    picture.removeAttribute("width");
    picture.removeAttribute("height");

    if (picture.height >= screenSize.height) {
        picture.height = screenSize.height - 128;
    } else if (picture.width >= screenSize.width) {
        picture.width = screenSize.width - 512;
    }

    remote.getCurrentWindow().setSize(picture.width, picture.height);
}