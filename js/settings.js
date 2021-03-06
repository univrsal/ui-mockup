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

function go_dark()
{
    var body = document.getElementById('body');
    body.classList.remove('bright');
    body.classList.add('dark');
}

function go_bright()
{
    var body = document.getElementById('body');
    body.classList.remove('dark');
    body.classList.add('bright');
}

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
    return;
    var check = /^[0-9]{1,2}:[0-9]{1,2}$/;
    if (!event.target.value.match(check)) {
        event.preventDefault();
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

/* sortable */
new Sortable(document.getElementById('sortable1', {
    animation: 150,
    ghostClass: 'sortable-ghost'
}));

/* Time controls */

var days = [ 
    { 'id' : 0, 'txt': 'Montag'},
    { 'id' : 1, 'txt': 'Dienstag'},
    { 'id' : 2, 'txt': 'Mittwoch'},
    { 'id' : 3, 'txt': 'Donnerstag'},
    { 'id' : 4, 'txt': 'Freitag'},
    { 'id' : 5, 'txt': 'Samstag'},
    { 'id' : 6, 'txt': 'Sonntag'}
];

function cycle_day(target, dir) {
    var box = document.getElementById(target);
    var current = days[0];
    for (var i = 0; i < days.length; i++) {
        if (days[i].txt === box.value) {
            current = days[i];
            break;
        }
    }

    var next = current.id + dir;
    if (next < 0) {
        current = days[6];
    } else if (next > 6) {
        current = days[0];
    } else {
        current = days[next];
    }

    box.value = current.txt;
}

var spinbox_off = document.getElementsByClassName('spinbox-noinput');
for (var i = 0; i < spinbox_off.length; i++) {
    spinbox_off[i].disabled = true;
}