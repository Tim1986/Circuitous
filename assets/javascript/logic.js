document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar-goes-here');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ]
    });

    calendar.render();
  });