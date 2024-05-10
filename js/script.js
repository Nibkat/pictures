var picture = $('#picture');

var urlTextbox = $('#urlTextbox');
urlTextbox.hide();

var openImageButton = $('#openImageButton');
var openUrlButton = $('#openUrlButton');
var deleteButton = $('#deleteButton');

openImageButton.click(function (event) {
    ipcRenderer.send('open-file-dialog');
});

openUrlButton.click(function () {
    urlTextbox.fadeToggle('fast');
});

deleteButton.click(function () {
    ipcRenderer.send('delete-confirmation');
});

ipcRenderer.on('selected-image', function (event, path) {
    picture.attr('src', `${path}`);
});

picture.on('load', function () {
    setWindowSize();
    centerWindow();
});

picture.dblclick(function () {
    ipcRenderer.send('open-file-dialog');
});

urlTextbox.keypress(function (e) {
    if (e.keyCode == 13) {
        testImage(urlTextbox.val(), function (url, result) {
            if (result == 'success') {
                picture.attr('src', url);
                urlTextbox.fadeOut('fast');
                urlTextbox.val('');
            } else {
                alert(url + ' is not a valid image');
            }
        });
    }
});