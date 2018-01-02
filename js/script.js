const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

const electronScreen = require('electron').screen;
const screenSize = electronScreen.getPrimaryDisplay().size;

var picture = document.getElementById('picture');

remote.getCurrentWindow().setSize(picture.width, picture.height);
remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));

$('#minimizeButton').click(function () {
    remote.getCurrentWindow().minimize();
});

$('#closeButton').click(function () {
    remote.getCurrentWindow().close();
});

$('#select-directory').click(function (event) {
    ipc.send('open-file-dialog');
});

ipc.on('selected-image', function (event, path) {
    picture.src = `${path}`;
});

$('#picture').on('load', function () {
    remote.getCurrentWindow().setSize(picture.width, picture.height);
    remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));
});