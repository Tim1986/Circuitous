//form input
var newActivity = {
    getDuration: function () {
        //pulls start and end info
        //removes the : in the timestamps and finds the difference
        var arrStart = $("#start-time").val().trim().split(":");
        var arrEnd = $("#end-time").val().trim().split(":");
        var diffHour = parseInt(arrEnd[0]) - parseInt(arrStart[0]);
        console.log(diffHour);
        if (parseInt(arrEnd[1]) < parseInt(arrStart[1])) {
            parseInt(arrEnd[1]) + 60;
        }
        //if they put in an end time past midnight
        if (diffHour < 0) {
            alert("Please only enter activities that can be completed in one day!")
            $("#start-time").val("");
            $("#end-time").val("");
        }
        var diffMin = parseInt(arrEnd[1]) - parseInt(arrStart[1]);
        console.log(diffMin);
        if (diffMin < 0) {
            diffHour--;
            diffMin = (60 + diffMin);
        }
        //formats the difference to HH:mm and makes it a string
        if (diffHour.toString().length === 1) {
            diffHour = "0" + diffHour.toString();
        }
        else {
            diffHour.toString();
        }
        if (diffMin.toString().length === 1) {
            diffMin = "0" + diffMin.toString();
        }
        else {
            diffMin.toString();
        }
        //sets the difference as the duration
        var duration = diffHour + ":" + diffMin;
        console.log("duration " + duration);
        return duration;

    }

}




$(document).ready(function () {

    //when user clicks Get Duration
    $("#get-duration").on("click", function (event) {
        event.preventDefault();
        //keeps Get Duration from running with no input
        // if (($("#start-time").val("")) || ($("#end-time").val(""))) {
        //     console.log("NO BLANKS")
        // }
        // else {
        $("#activity-duration").val(newActivity.getDuration());
        $("#activity-duration").attr("disabled", true);
        //option to clear the duration and start over
        $("#get-duration").text("Clear Duration").on("click", function () {
            $("#activity-duration").attr("disabled", false);
            $("#activity-duration").val("");
            $("#start-time").val("");
            $("#end-time").val("");
            $("#get-duration").text("Get Duration");
        })
    })

    //when user clicks submit
    $("#submit-activity").on("click", function (event) {
        event.preventDefault();
        //pulls activity info
        newActivity = {
            name: $("#activity-name").val().trim(),
            date: $("#activity-date").val().trim(),
            start: $("#start-time").val().trim(),
            end: $("#activity-name").val().trim(),
            duration: newActivity.getDuration(),
            description: $("#activity-description").val().trim(),
            daily: false,
        }
        console.log("duration is " + newActivity.duration);

        //runs getDuration if they put in a start & end but didnt finish
        if ($("#activity-duration").val("") === "") {
            newActivity.duration = newActivity.getDuration()
        }
        if ($("#recurring").is(":checked")) {
            newActivity.daily = true;
        }
        //clears form
        $("#activity-name").val("");
        $("#activity-date").val("")
        $("#start-time").val("");
        $("#end-time").val("");
        $("#activity-duration").val("");
        $("#activity-description").val("");
        $("#checkboxId").prop("checked", false)
        $("#get-duration").text("Get Duration");
        $("#get-duration").off();

        console.log("name " + newActivity.name); //not working
        console.log("date " + newActivity.date); //not working
        console.log("start time " + newActivity.start); //only working if you input fake vars
        console.log("duration " + newActivity.duration); //only working if you input start time/end
        console.log("description " + newActivity.description); //not working
        console.log("daily reoccurance is " + newActivity.daily); //working!!!

    })
})

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-goes-here');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'interaction', 'list', 'moment'],
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
