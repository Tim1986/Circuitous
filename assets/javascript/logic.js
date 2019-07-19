document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar-goes-here');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'interaction', 'list', 'moment'],
      header: { center: 'dayGridMonth, dayGridWeek, dayGridDay' }, // buttons for switching between views

      views: {
        dayGridMonth: { // name of view
        titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
      // other view-specific options here
    }
  }
    });

    calendar.render();
  });