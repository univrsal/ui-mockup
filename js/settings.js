var active_tab_id = 1;
var active_tab = document.getElementById('page1');

function select_tab(event, id)
{
    document.activeElement.blur();
    var tabs = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-button-pressed');
    }
    event.target.classList.add('tab-button-pressed');
    
    /* switch tab */
    var next_tab = document.getElementById('page' + id);
    active_tab.classList.add('move-right-out');    
    next_tab.style.display = 'block';
    next_tab.classList.add('move-left-in');
    next_tab.classList.add('move-align');

    active_tab = next_tab;
}