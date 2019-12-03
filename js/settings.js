var active_tab_id = 1;
var active_tab = document.getElementById('page1');

function select_tab(event, id)
{
    /* Handle tab bar */
    document.activeElement.blur();
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
    }, 250, in_class, out_class, next_tab, active_tab);

    active_tab = next_tab;
    active_tab_id = id;
}