var active_tab_id = 1;
var active_tab = document.getElementById('page1');
var slide_block = false;

function handle_time(event)
{
    var check = /^[0-9]{1,2}:[0-9]{1,2}$/;
    if (!event.target.value.match(check)) {
        event.target.value = event.target.value.slice(0, -1);
    }
}

function select_tab(event, id)
{
    document.activeElement.blur();
    if (slide_block)
        return;
    slide_block = true;
    if (id === active_tab_id)
        return;

    /* Handle tab bar */
    var tabs = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-button-pressed');
    }
    event.target.classList.add('tab-button-pressed');
    
    /* switch tab */
    var next_tab = document.getElementById('page' + id);
    var out_class = 'move-right-out';
    var in_class = 'move-left-in';

    if (id > active_tab_id) { /* Scrolling to the left */
        out_class = 'move-left-out';
        in_class = 'move-right-in';
    }    

    active_tab.classList.add(out_class);
    next_tab.style.display = 'block';
    next_tab.classList.add(in_class);

    /* Remove transition classes again */
    setTimeout(function(in_class, out_class, next_tab, active_tab) {
        next_tab.classList.remove(in_class);
        active_tab.classList.remove(out_class);
        active_tab.style.display = 'none'; 
        slide_block = false;
    }, 500, in_class, out_class, next_tab, active_tab);

    active_tab = next_tab;
    active_tab_id = id;
}