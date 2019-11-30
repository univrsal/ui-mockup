function exchange(from, to) {
    if (from !== null) {
        from.style.display = 'none';
        from.classList.remove('fadeOut');
    }

    to.style.display = 'block';
    to.classList.add('fadeIn');
    setTimeout(function(what) {
        what.classList.remove('fadeIn');
    }, 500, to);
}

function goto_page(from, to) {
    var next = document.getElementById(to);
    var prev = document.getElementById(from);

    if (prev !== null)
        prev.classList.add('fadeOut');
    setTimeout(exchange, 500, prev, next);
}

function open_dialog(id) {
    var d = document.getElementById(id);
    var m = document.getElementById('main');
    var i = document.getElementById('bg-image');

    if (d !== null) {
        d.style.opacity = 1;
        d.style.pointerEvents = 'all';
        m.style.pointerEvents = 'none';
        m.classList.add('blurred');
        i.classList.add('blurred');
    }
}

function close_dialog(id) {
    var d = document.getElementById(id);
    var m = document.getElementById('main');
    var i = document.getElementById('bg-image');

    if (d !== null) {
        d.style.opacity = 0;
        d.style.pointerEvents = 'none';
        m.style.pointerEvents = 'all';
        m.classList.remove('blurred');
        i.classList.remove('blurred');
    }
}