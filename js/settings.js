/*************************************************************************
* settings.js is part of ui-mockup
* created on Wednesday, 4th December 2019 16:32:27
* github.com/univrsal/ui-mockup
* Copyright 2019 univrsal (universailp@web.de)
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 3 of the License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*************************************************************************/

var active_tab_id = 1;
var active_tab = document.getElementById('page1');
var slide_block = false;


function remove_class(from, name)
{
    from.classList.remove(name);
}

function toggle_options(event, target)
{
    var options = document.getElementById(target);
    var children = options.children;
    
    for (var i = 0; i < children.length; i++)  {
        if (event.target.checked) {
            children[i].classList.remove('disabled');
            children[i].classList.add('enabled');
        } else {
            children[i].classList.remove('enabled');
            children[i].classList.add('disabled');
        }
    }
}

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
    if (slide_block || id === active_tab_id)
    return;
    slide_block = true;
    
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

/* Timeline */
function date() {
    var d = new Date();
    d.setHours(8);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
}

function date_add(hours, minutes) {
    var copy = date(); 
    copy.setHours(copy.getHours() + hours);
    copy.setMinutes(copy.getMinutes() + minutes);
    return copy;
}

var container = document.getElementById('visualization');
var items = new vis.DataSet([
    {id: 1, start: date_add(0, 50), end: date_add(1, 0), className: 'missed'},
    {id: 2, start: date_add(1, 50), end: date_add(2, 0), className: 'taken'},
    {id: 3, start: date_add(2, 50), end: date_add(3, 0), className: 'upcoming'},
    {id: 4, start: date_add(3, 50), end: date_add(4, 0), className: 'upcoming'}
])

var options = {
    min: date_add(-9, 0),
    max: date_add(15, 0),
    minHeight: '100px'
};

var tl = new vis.Timeline(container, items, options);

/* sortable */
new Sortable(document.getElementById('sortable1', {
    animation: 150,
    ghostClass: 'sortable-ghost'
}));