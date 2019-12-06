var pausen = 2;
var total = 10;
var in_break = false;
setup();

function settings()
{
    document.location = "./settings.html";
}

function setup()
{
    var time = new Date();
    var h = time.getHours() + 1;
    var m = time.getMinutes();

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;

    var next = '';
    var until = '';
    document.getElementById('time').textContent = h + ':' + m;
    document.getElementById('date').textContent = time.toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    var next = 0;
    if (time.getMinutes() < 50) {
        if (in_break) {
            pausen++;
            document.getElementById('breaks').textContent = pausen + ' von ' + total + ' Pausen';
            in_break = false;
        }
        next = 'Nächste Pause um ' + h + ':50';
        var left = 50 - time.getMinutes();
        var unit = 'Minuten';

        if (left < 3) {
            left *= 60;
            left -= time.getSeconds();
            unit = left > 1 ? 'Sekunden' : 'Sekunde';
        }
        until = 'In ' + left + ' ' + unit;
    } else if (time.getMinutes() <= 59) {
        in_break = true;
        var left = 60 - time.getMinutes();
        var unit = 'Minuten';
        if (left < 3) {
            left *= 60; 
            left -= time.getSeconds();
            unit = left > 1 ? 'Sekunden' : 'Sekunde';
        }

        next = 'Noch ' + left + ' ' + unit + ' Pause';
    } else {
        next = 'Nächste Pause um ' + (h + 1) + ':50';
    }
    document.getElementById('reminder').textContent = next;
    document.getElementById('countdown').textContent = until;
    setTimeout(setup, 900);
}

function handle_close()
{
    document.getElementById('main').classList.add('fadeOut');
    setTimeout(function() {
        document.getElementById('main').style.display = 'none';
    }, 500);
}