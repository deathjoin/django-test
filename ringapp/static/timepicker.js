django.jQuery('document').ready(function () {

    var times = [
        [8, 30, 0],
        [9, 15, 0],
        [9, 20, 1],
        [10, 5, 0],
        [10, 15, 0],
    ];

    DateTimeShortcuts.handleClockQuicklink = function(num, h, m) {
        var d = new Date(1970, 1, 1, h, m, 0, 0);
        DateTimeShortcuts.clockInputs[num].value = d.strftime(get_format('TIME_INPUT_FORMATS')[0]);
        DateTimeShortcuts.clockInputs[num].focus();
        DateTimeShortcuts.dismissClock(num);
    }

   DateTimeShortcuts.addClock = function(inp) {
            var num = DateTimeShortcuts.clockInputs.length;
            DateTimeShortcuts.clockInputs[num] = inp;
            DateTimeShortcuts.dismissClockFunc[num] = function() { DateTimeShortcuts.dismissClock(num); return true; };

            // Shortcut links (clock icon and "Now" link)
            var shortcuts_span = document.createElement('span');
            shortcuts_span.className = DateTimeShortcuts.shortCutsClass;
            inp.parentNode.insertBefore(shortcuts_span, inp.nextSibling);
            var now_link = document.createElement('a');
            now_link.setAttribute('href', "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", -1);");
            now_link.appendChild(document.createTextNode(gettext('Now')));
            var clock_link = document.createElement('a');
            clock_link.setAttribute('href', 'javascript:DateTimeShortcuts.openClock(' + num + ');');
            clock_link.id = DateTimeShortcuts.clockLinkName + num;
            quickElement(
                'span', clock_link, '',
                'class', 'clock-icon',
                'title', gettext('Choose a Time')
            );
            shortcuts_span.appendChild(document.createTextNode('\u00A0'));
            shortcuts_span.appendChild(now_link);
            shortcuts_span.appendChild(document.createTextNode('\u00A0|\u00A0'));
            shortcuts_span.appendChild(clock_link);

            // Create clock link div
            //
            // Markup looks like:
            // <div id="clockbox1" class="clockbox module">
            //     <h2>Choose a time</h2>
            //     <ul class="timelist">
            //         <li><a href="#">Now</a></li>
            //         <li><a href="#">Midnight</a></li>
            //         <li><a href="#">6 a.m.</a></li>
            //         <li><a href="#">Noon</a></li>
            //         <li><a href="#">6 p.m.</a></li>
            //     </ul>
            //     <p class="calendar-cancel"><a href="#">Cancel</a></p>
            // </div>

            var clock_box = document.createElement('div');
            clock_box.style.display = 'none';
            clock_box.style.position = 'absolute';
            clock_box.className = 'clockbox module';
            clock_box.setAttribute('id', DateTimeShortcuts.clockDivName + num);
            document.body.appendChild(clock_box);
            addEvent(clock_box, 'click', cancelEventPropagation);

            quickElement('h2', clock_box, gettext('Choose a time'));
            var time_list = quickElement('ul', clock_box);
            time_list.className = 'timelist';
            var h, m;
            times.forEach(function(item, i, arr){
                h = item[0];
                m = item[1].toString().length == 1? '0'+ item[1].toString() : item[1];
                quickElement(
                    "a",
                    quickElement("li", time_list),
                    gettext(h + ":" + m),
                    "href",
                    "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", " + h + ", " + m + ");"
                );
            });
            //quickElement("a", quickElement("li", time_list), gettext("Now"), "href", "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", -1);");
            //quickElement("a", quickElement("li", time_list), gettext("Midnight1231312"), "href", "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", 0);");
            //quickElement("a", quickElement("li", time_list), gettext("6 a.m.213123"), "href", "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", 6);");
            //quickElement("a", quickElement("li", time_list), gettext("Noon21312"), "href", "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", 12);");
            //quickElement("a", quickElement("li", time_list), gettext("6 p.m."), "href", "javascript:DateTimeShortcuts.handleClockQuicklink(" + num + ", 18);");

            var cancel_p = quickElement('p', clock_box);
            cancel_p.className = 'calendar-cancel';
            quickElement('a', cancel_p, gettext('Cancel'), 'href', 'javascript:DateTimeShortcuts.dismissClock(' + num + ');');
            django.jQuery(document).bind('keyup', function(event) {
                if (event.which === 27) {
                    // ESC key closes popup
                    DateTimeShortcuts.dismissClock(num);
                    event.preventDefault();
                }
            });
        }

    /*DateTimeShortcuts.overrideTimeOptions = function () {
        var clockCount = 0;
        console.log('ready');
        django.jQuery('ul.timelist').each(function () {
            var $this = django.jQuery(this);
            var originalHref = $this.find('a').attr('href');
            console.log(originalHref);
            $this.find('li').remove();
            for (i=8; i <= 20; i++) {
                var newLink = '<li><a href="javascript:DateTimeShortcuts.handleClockQuicklink('+ clockCount + ', ' + i
                    + ');"> ' + i + ':00h</a></li>';
                $this.append(newLink);
            }
            console.log($this.html());

            clockCount++;

            var h, m, style;
            times.forEach(function(item, i, arr){
                h = item[0];
                m = item[1].toString().length == 1? '0'+ item[1].toString() : item[1];
                style = item[2] == 0 ? '' : 'background-color: #eeeeee; text-align: right;'

                $this.append(
                    '<li style="'+ style +'">' +
                    '<a style="padding-right: 20px;" href="javascript:DateTimeShortcuts.handleClockQuicklink('+ clockCount + ', ' + h + ', '+ m +');">' +
                    h + ':' + m +
                    '</a>' +
                    '</li>'
                );
            })
            clockCount++;
        });
    };*/

    addEvent(window, 'load', DateTimeShortcuts.overrideTimeOptions);
});