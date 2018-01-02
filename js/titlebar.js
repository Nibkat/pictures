var autoHideTitlebarInterval;

$('*').mousemove(function (e) {
    clearInterval(autoHideTitlebarInterval);

    if (e.clientY <= $('#titlebar')[0].getBoundingClientRect().bottom) {
        $('#titlebar').css('opacity', '1');
        autoHideTitlebarInterval = setInterval(function () {
            $('#titlebar').css('opacity', '0');
        }, 10000);
    } else {
        $('#titlebar').css('opacity', '0');
    }
});

/*$('#minimizeButton').mouseenter(function() {
    $('#minimizeButton').html('-');
});

$('#minimizeButton').mouseout(function() {
    $('#minimizeButton').html('');
});

$('#closeButton').mouseenter(function() {
    $('#closeButton').html('x');
});

$('#closeButton').mouseout(function() {
    $('#closeButton').html('');
});*/