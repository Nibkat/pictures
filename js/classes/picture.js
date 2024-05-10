class Picture {
    constructor(path) {
        this.path = path.resolve(path);
    }

    isLocal() {
        return fs.existsSync(this.path);
    }

    isAsset() {
        let assetDirectory = __dirname + '\\assets';

        return this.path.startsWith(assetDirectory);
    }

    revealInFolder() {
        shell.showItemInFolder(this.path);
    }

    moveToTrash() {
        if (this.isLocal()) {
            shell.moveItemToTrash(this.path);

            return true;
        } else {
            alert("This file doesn't exist or isn't local, cannot delete");

            return false;
        }
    }

    permaDelete() {
        if (this.isLocal()) {
            fs.unlink(this.path, (err) => {
                if (err) {
                    alert("An error ocurred updating the file" + err.message);
                    console.log(err);
                    return false;
                } else {
                    return true;
                }
            });
        } else {
            alert("This file doesn't exist or isn't local, cannot delete");
            return false;
        }
    }

    copyPicture() {
        let image = nativeImage.createFromPath(this.path);

        clipboard.writeImage(image);
    }

    copyPicturePath() {
        clipboard.writeText(this.path);
    }
}