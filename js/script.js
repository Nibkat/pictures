const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

const electronScreen = require('electron').screen;
const screenSize = electronScreen.getPrimaryDisplay().size;

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

function centerWindow() {
    remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));
}

function setWindowSize() {
    picture.removeAttribute("width");
    picture.removeAttribute("height");

    if (picture.height > screenSize.height) {
        picture.height = screenSize.height - 128;
    } else if (picture.width > screenSize.width) {
        picture.width = screenSize.width - 512;
    }

    remote.getCurrentWindow().setSize(picture.width, picture.height);
}

var holder = document;

holder.ondragover = () => {
    return false;
};

holder.ondragleave = () => {
    return false;
};

holder.ondragend = () => {
    return false;
};

holder.ondrop = (e) => {
    e.preventDefault();

    for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        picture.src = f.path;
    }

    return false;
};