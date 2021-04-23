$(function() {
    $('input[name="date-range"]').daterangepicker({
        opens: 'left',
        locale: {
            format: "DD/MM/YYYY",
            separator: " - ",
            applyLabel: "Принять",
            cancelLabel: "Отмена",
            fromLabel: "От",
            toLabel: "До",
            customRangeLabel: "Произвольный",
            daysOfWeek: [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            monthNames: [
                "Январь", // заменяем на Январь
                "Февраль", // Февраль и т д
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентабрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            firstDay: 1
        }
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});