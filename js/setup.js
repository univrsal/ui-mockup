var cur_page = 1;
var pre_page = 1;
var main = document.getElementById('main');
var bg = document.getElementById('bg-image');

var pages = {
    INTRO: 1,
    GROUPS: 2,
    SERVICES: 3,
    END: 4,
};

function skip()
{
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

function back()
{
    if (cur_page <= 1)
        return;
    /* Only go to previous page if it's actually the previous one
       otherwise just decrease page number by one. This prevents the back
       button from going forward if the user goes back from the last page
       because then previous page will contain the last page and consquentially
       will use that when going back.
    */
    var new_page = cur_page < pre_page ? cur_page - 1 : pre_page;

    if (new_page > 0)
        goto_page(new_page);
}

function handle_buttons()
{
    var skip = document.getElementById('skip');
    var back = document.getElementById('back');
    
    back.style.display = cur_page > 1 ? 'block' : 'none';
    switch (cur_page) {
        case pages.INTRO:
            skip.textContent = 'Überspringen';
            break;
        case pages.END:
            skip.textContent = 'Fertigstellen';
            break;
        default:
            skip.textContent = 'Weiter';
    }
}

function exchange(from, to)
{
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

function goto_page(t)
{
    clear_select();
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

function open_dialog(id, title)
{
    var d = document.getElementById(id);
    if (title !== undefined ) {
         document.getElementById('serviceTitle').textContent = 'Mit ' + title + ' Konto einloggen';
    }

    if (d !== null) {
        d.style.opacity = 1;
        d.style.pointerEvents = 'all';
        main.style.pointerEvents = 'none';
        main.classList.add('blurred');
        bg.classList.add('blurred');
    }
}

function close_dialog(id, handler)
{
    var d = document.getElementById(id);
    if (handler !== undefined)
        handler();
    if (d !== null) {
        d.style.opacity = 0;
        d.style.pointerEvents = 'none';
        main.style.pointerEvents = 'all';
        main.classList.remove('blurred');
        bg.classList.remove('blurred');
    }
}

function handle_join()
{
    document.getElementById('joinGroupText').value = '';
}

function handle_create()
{
    document.getElementById('newGroupText').value = '';
    document.getElementById('addMemberText').value = '';
}

function clear_select()
{
    if (window.getSelection) {
        if (window.getSelection().empty) { 
             window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {
        document.selection.empty();
    }
}

/* Resizing */
var dragging = false;
var main_pos = { "x" : 0, "y": 0 };

function start_drag(event)
{
    clear_select();
    dragging = true;
    main.style.pointerEvents = 'none';
}

function stop_drag(event)
{
    dragging = false;
    main.style.pointerEvents = 'all';
}
var setup = document.getElementsByClassName('setup')[0];

function drag(event)
{
    if (dragging) {
        var r = main.getBoundingClientRect();
        main_pos.x = r.left;
        main_pos.y = r.top;
        var w = event.pageX - 15 - main_pos.x;
        var h = event.pageY - 15 - main_pos.y;
        setup.style.width = w + 'px';
        setup.style.height = h + 'px';
    }
}