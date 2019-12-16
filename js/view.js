/*************************************************************************
 * view.js is part of ui-mockup
 * created on Wednesday, 12th December 2019 09:46:22
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
]);

var options = {
    min: date_add(-9, 0),
    max: date_add(15, 0),
    minHeight: '100px'
};

var tl = new vis.Timeline(container, items, options);
