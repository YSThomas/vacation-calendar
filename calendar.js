document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    locale: 'ru',
    events: eventsCalendarArray
  });
  calendar.render();
  console.log(eventsCalendarArray)
});