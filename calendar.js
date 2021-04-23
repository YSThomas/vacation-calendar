document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    locale: 'ru',
    events: eventsCalendarArray
  });
  calendar.render();
  console.log(eventsCalendarArray)
});