let calendar = null;

// function editEvent(event) {
//   $('#event-modal input[name="event-index"]').val(event ? event.id : '');
//   $('#event-modal input[name="event-name"]').val(event ? event.name : '');
//   $('#event-modal input[name="event-location"]').val(event ? event.location : '');
//   $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
//   $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
//   $('#event-modal').modal();
// }
//
// function deleteEvent(event) {
//   var dataSource = calendar.getDataSource();
//
//   calendar.setDataSource(dataSource.filter(item => item.id == event.id));
// }

function createCalendar() {
  let currentYear = new Date().getFullYear();

  calendar = new Calendar('#calendar', {
    language: 'ru',
    enableContextMenu: true,
    enableRangeSelection: true,
    // contextMenuItems:[
    //   {
    //     text: 'Update',
    //     click: editEvent
    //   },
    //   {
    //     text: 'Delete',
    //     click: deleteEvent
    //   }
    // ],
    // selectRange: function(e) {
    //   editEvent({ startDate: e.startDate, endDate: e.endDate });
    // },
    mouseOnDay: function(e) {
      if(e.events.length > 0) {
        var content = '';

        for(var i in e.events) {
          content += '<div class="event-tooltip-content">'
              + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
              + '<div class="event-location">' + e.events[i].location + '</div>'
              + '</div>';
        }

        $(e.element).popover({
          trigger: 'manual',
          container: 'body',
          html:true,
          content: content
        });

        $(e.element).popover('show');
      }
    },
    mouseOutDay: function(e) {
      if(e.events.length > 0) {
        $(e.element).popover('hide');
      }
    },
    dayContextMenu: function(e) {
      $(e.element).popover('hide');
    },
    dataSource: calendarEventsArray
  });
}