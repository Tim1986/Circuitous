var activityName
var activityDate
var activityStart
var activityEnd
var activityDur
var activityDescr
var activityDaily = false;

function getDuration() {
    //pulls start and end info
    activityStart = $("#start-time").val().trim();
    activityEnd = $("#end-time").val().trim();
    console.log(activityStart);
    console.log(activityEnd);
    //removes the : in the timestamps and finds the difference
    var splitStart = activityStart.split(":");
    var splitEnd = activityEnd.split(":");
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
    //sets the difference as the duration and pushes it to DOM
    activityDur = diffHour + ":" + diffMin;
    console.log("duration " + activityDur);

}




$(document).ready(function () {

    //when user clicks Get Duration
    $("#get-duration").on("click", function (event) {
        event.preventDefault();
        getDuration();
        $("#activity-duration").val(activityDur);
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
        activityName = $("#activity-name").val().trim();
        activityDate = $("#activity-date").val().trim();
        activityStart = $("#start-time").val().trim();
        if (($("#activity-duration").val().trim()) === "") {
            getDuration()
        }
        else {
            activityDur = $("#activity-duration").val().trim();
        }
        activityDescr = $("#activity-description").val().trim();
        if ($("#recurring").is(":checked")) {
            activityDaily = true;
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

        console.log("name " + activityName);
        console.log("date " + activityDate);
        console.log("start time " + activityStart);
        console.log("duration " + activityDur);
        console.log("description " + activityDescr);
        console.log("daily reoccurance is " + activityDaily);

    })
})

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
