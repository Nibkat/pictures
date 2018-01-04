var picture = document.getElementById('picture');
$('#urlTextBox').hide();

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

$('#open-url').click(function () {
    $('#urlTextBox').fadeToggle('fast');
});

ipc.on('selected-image', function (event, path) {
    picture.src = `${path}`;
});

$('#picture').on('load', function () {
    setWindowSize();
    centerWindow();
});

$('#picture').dblclick(function () {
    ipc.send('open-file-dialog');
});

$('#urlTextBox').keypress(function (e) {
    if (e.keyCode == 13) {
        if (checkURL($('#urlTextBox').val())) {
            picture.src = $('#urlTextBox').val();
            $('#urlTextBox').val('');
            $('#urlTextBox').fadeOut('fast');
        }
        else
            alert('Url is not an image');
    }
});

function centerWindow() {
    remote.getCurrentWindow().setPosition(Math.round(screenSize.width / 2 - picture.width / 2), Math.round(screenSize.height / 2 - picture.height / 2));
}

function setWindowSize() {
    picture.removeAttribute("width");
    picture.removeAttribute("height");

    if (picture.height >= screenSize.height) {
        picture.height = screenSize.height - 128;
    }
    if (picture.width >= screenSize.width) {
        picture.width = screenSize.width - 128;
        picture.removeAttribute("height");
    }

    remote.getCurrentWindow().setSize(picture.width, picture.height);
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}