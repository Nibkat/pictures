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

    if (e.dataTransfer.files[0].type.includes('image')) {
        $(picture).attr('src', e.dataTransfer.files[0].path);
    }

    return false;
};