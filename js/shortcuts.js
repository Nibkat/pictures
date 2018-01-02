$(document).keydown(function (e) {
    // Open image
    if (e.ctrlKey && e.keyCode == 79) {
        ipc.send('open-file-dialog');
    }

    // Copy image
    if (e.ctrlKey && e.keyCode == 67) {
        copyImage();
    }

    // Quit
    if (e.ctrlKey && e.keyCode == 81) {
        remote.getCurrentWindow().close();
    }
});

function copyImage() {
    console.log('hey');

    let image = nativeImage.createFromPath(picture.src);
    clipboard.writeBuffer('png', image.toPNG());
}