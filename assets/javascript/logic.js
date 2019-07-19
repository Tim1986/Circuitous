//form input
var newActivity = {
    name: $("#activity-name").val().trim(),
    date: $("#activity-date").val().trim(),
    start: $("#start-time").val().trim(),
    end: $("#activity-name").val().trim(),
    duration: $("#activity-duration").val().trim(),
    description: $("#activity-name").val().trim(),
    daily: false,
}

function getDuration() {
    //pulls start and end info
    console.log(newActivity.start);
    console.log(newActivity.end);
    //removes the : in the timestamps and finds the difference
    var splitStart = newActivity.start.split(":");
    var splitEnd = newActivity.end.split(":");
    var diffHour = parseInt(splitEnd[0]) - parseInt(splitStart[0]);
    console.log(diffHour);
    if (parseInt(splitEnd[1]) < parseInt(splitStart[1])) {
        parseInt(splitEnd[1]) + 60;
    }
    //if they put in an end time past midnight
    if (diffHour < 0) {
        alert("Please only enter activities that can be completed in one day!")
        $("#start-time").val("");
        $("#end-time").val("");
    }
    var diffMin = parseInt(splitEnd[1]) - parseInt(splitStart[1]);
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
    newActivity.actDuration = diffHour + ":" + diffMin;
    console.log("duration " + newActivity.duration);

}


$(document).ready(function () {

    //when user clicks Get Duration
    $("#get-duration").on("click", function (event) {
        event.preventDefault();
        //dummy variables while we troubleshoot
        newActivity.start = "17:00";
        newActivity.end = "19:00";
        //keeps Get Duration from running with no input
        //PLEASE UNCOMMENT THIS AND THE LAST BRACKET WHEN INPUT GETS FIXED!!!
        // if (($("#start-time").val("")) || ($("#end-time").val(""))) {
        //     console.log("NO BLANKS")
        // }
        // else {
            getDuration();
            $("#activity-duration").val(newActivity.duration);
            $("#activity-duration").attr("disabled", true);
            //option to clear the duration and start over
            $("#get-duration").text("Clear Duration").on("click", function () {
                $("#activity-duration").attr("disabled", false);
                $("#activity-duration").val("");
                $("#start-time").val("");
                $("#end-time").val("");
                $("#get-duration").text("Get Duration");
            })
        // }
    })

    //when user clicks submit
    $("#submit-activity").on("click", function (event) {
        event.preventDefault();
        //pulls activity info
        //runs getDuration if they put in a start & end but didnt finish
        if (newActivity.duration === "") {
            getDuration()
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
