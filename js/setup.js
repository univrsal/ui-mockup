var cur_page = 1;
var pre_page = 1;

var pages = {
    INTRO: 1,
    GROUPS: 2,
    SERVICES: 3,
    END: 4,
};

function skip() {
    if (cur_page >= 4)
        return;
    var new_page = -1;

    switch (cur_page) {
        case pages.INTRO: /* skip entire setup */
            new_page = pages.END;
            break;
        case pages.SERVICES:
        case pages.GROUPS:
            new_page = cur_page + 1;
        default:;
    }

    if (new_page > 0)
        goto_page(new_page);
}

function back() {
    if (cur_page <= 1)
        return;
    var new_page = pre_page;

    if (new_page > 0)
        goto_page(new_page);
}

function handle_buttons() {
    var skip = document.getElementById('skip');
    var back = document.getElementById('back');
    
    back.style.display = cur_page > 1 ? 'block' : 'none';
    skip.textContent = cur_page >= 4 ? 'Fertigstellen' : 'Überspringen';
}

function exchange(from, to) {
    if (from !== null) {
        from.style.display = 'none';
        from.classList.remove('fadeOut');
    }
    if (to !== null) {
        to.style.display = 'block';
        to.classList.add('fadeIn');
    }
    setTimeout(function(what) {
        what.classList.remove('fadeIn');
    }, 500, to);
}

function goto_page(t) {
    pre_page = cur_page;
    cur_page = t;
    var to = 'page' + t;
    var from = 'page' + pre_page;
    handle_buttons();

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