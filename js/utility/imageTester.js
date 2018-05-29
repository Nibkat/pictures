function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    let timedOut = false,
        timer;
    let img = new Image();
    img.onerror = img.onabort = () => {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'error');
        }
    };
    img.onload = () => {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, 'success');
        }
    };
    img.src = url;
    timer = setTimeout(() => {
        timedOut = true;
        callback(url, 'timeout');
    }, timeout);
}