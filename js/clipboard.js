function copyImage() {
    console.log('hey');

    let image = nativeImage.createFromPath(picture.src);
    clipboard.writeBuffer('image', image.toPNG());
}