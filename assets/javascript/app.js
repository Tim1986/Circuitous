
var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

//form input
var newActivity = {
    getDuration: function () {
        //pulls start and end info
        console.log("getDuration is running");
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
            $('#submit-activity').on(click, function () {
                $(".bg-modal").style.display = 'flex';
            });
            $('.close').on(click, function () {
                $(".bg-modal").style.display = 'none';
            });
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

// functions for adding and removing activities
function addData(chart, actObj) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        tempArr.push(data)
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        tempArr.pop()

    });
    chart.update();
}


var colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(210, 180, 140, 1)',
    'rgba(0, 0, 139, 1)',
    'rgba(204, 204, 0, 1)',
    'rgba(0, 100, 0, 1)',
    'rgba(139, 0, 139, 1)',
    'rgba(139, 0, 0, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 140, 0, 1)',
    'rgba(139, 69, 19, 1)',
]

// The data for our dataset
var data = {
    labels: [placeHolder.name,],
    datasets: [{
        label: 'Activitie Durations',
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        // borderColor: 'rgb(255, 00, 132)',
        data: [placeHolder.duration,]

    }]
}

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    data: data,

    // Configuration options go here
    options: {
        rotation: -.5 * Math.PI,
        borderWidth: 50,
        layout: {
            responsive: true,
            maintainAspectRatio: false,
            padding: {
                left: '50px',
                right: '50px',
                top: '50px',
                bottom: '50px',
            },
        },
    }
})

$(document).ready(function () {

    //when user clicks Get Duration
    $("#get-duration").on("click", function (event) {
        event.preventDefault();

        //if the button is currently Clear Duration
        if ($("#get-duration").hasClass("clear-duration") === true) {
            console.log("it's a clear button");
            $("#get-duration").removeClass("clear-duration");
            $("#activity-duration").val("");
            $("#start-time").val("");
            $("#end-time").val("");
            $("#get-duration").text("Get Duration");
        }
        else {
            //keeps Get Duration from running with no input
            if (($("#start-time").val() === "") || ($("#end-time").val() === "")) {
                console.log("NO BLANKS")
            }
            else {
                console.log("yay no blanks");
                //calculates duration
                $("#activity-duration").val(newActivity.getDuration());
                $("#get-duration").attr("class", "clear-duration");
                //turns the button into a clear button
                $("#get-duration").text("Clear Duration")
            }
        }
    })

    //when user clicks submit
    $("#submit-activity").on("click", function (event) {
        event.preventDefault();

        //submit click won't set any variables if there's no activity name
        if (($("#activity-name").val().trim()) === "") {
            document.querySelector('.bg-modal').style.display = 'flex';
            document.querySelector('.close').addEventListener('click', function () {
                document.querySelector('.bg-modal').style.display = 'none';
            });
            return;
        }
        //or if there's no date and "daily" isn't checked
        else if ((($("#activity-date").val().trim()) === "") && (!$("#recurring").is(":checked"))) {
            document.querySelector('.bg-modal').style.display = 'flex';
            document.querySelector('.close').addEventListener('click', function () {
                document.querySelector('.bg-modal').style.display = 'none';
            });;
            return;
        }
        //or if there's no start time
        else if (($("#start-time").val().trim()) === "") {
            document.querySelector('.bg-modal').style.display = 'flex';
            document.querySelector('.close').addEventListener('click', function () {
                document.querySelector('.bg-modal').style.display = 'none';
            });
            return;
        }

        else {

            // We're going to push our newActivity object into here
            var activityList = []

            //pulls activity info
            newActivity.date = $("#activity-date").val().trim()
            newActivity.start = $("#start-time").val().trim()
            newActivity.name = $("#activity-name").val().trim()
            newActivity.end = $("#end-time").val().trim()
            newActivity.description = $("#activity-description").val().trim()
            newActivity.daily = false
            var tempDuration = $("#activity-duration").val().trim();

            //runs getDuration if they put in a start & end but didnt finish
            if (($("#activity-duration").val("") === "") &&
                ($("#start-time").val("") !== "") && ($("#end-time").val("") !== "")) {
                newActivity.duration = newActivity.getDuration()
                console.log("i'm here!")
            }
            //pulls duration from the box if they input it and a start time manually
            if (($("#activity-duration").val("") !== "") && ($("#start-time").val("") !== "")) {
                newActivity.duration = tempDuration;
            }

            if ($("#recurring").is(":checked")) {
                newActivity.daily = true;
            }

            // We're pushing newActivity into the array, stringifying the array, then locally storing the array
            activityList.push(newActivity)
            activityList = activityList.concat(JSON.parse(localStorage.getItem('activityList') || '[]'));
            localStorage.setItem("activityList", JSON.stringify(activityList));

            // This grabs the stored, stringified array from local storage and unstringifies it
            var getArray = JSON.parse(localStorage.getItem('activityList'));

            // This is looping through each object in the array and running the addData function with each object's name and duration
            for (var i = 0; i < getArray.length; i++) {
                addData(chart, getArray[i].name, parseInt(getArray[i].duration))
            }

            var newActObj = {
                name: newActivity.name,
                start: newActivity.start,
                duration: newActivity.duration,
                end: newActivity.end,
            }

            addData(chart, newActObj);


        }
    });


    //dark mode button
    $("#dark-mode").on("click", function () {
        if ($("#css-link").hasClass("dark-on")) {
            $("#css-link").removeAttr("href");
            $("#css-link").attr("href", "assets/css/bootstrap.min.css");
            $("#dark-mode").text("Dark Mode");
            $("#css-link").removeClass("dark-on");
        }

        else {
            $("#css-link").removeAttr("href");
            $("#css-link").attr("href", "assets/css/bootstrap.dark.css");
            $("#dark-mode").text("Light Mode");
            $("#css-link").attr("class", "dark-on")
        }
    })

})

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-goes-here');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'list', 'interaction'],
        editable: true,
        defaultView: 'dayGridMonth',
        header: {
            center: 'addEventButton, listDay, dayGridWeek, dayGridMonth'
        },
        customButtons: {
            addEventButton: {
                text: 'update calendar...',
                click: function () {
                    var dateStr = $("#activity-date").val().trim();
                    //console.log(dateStr)            
                    // Gets stored data and parse it back
                    var getArray = JSON.parse(localStorage.getItem('activityList'));
                    console.log(getArray)
                    var date = new Date(dateStr + 'T00:00:00'); // will be in local time            
                    for (var i = 0; i < getArray.length; i++) {
                        calendar.addEvent({
                            title: getArray[i].name,
                            start: getArray[i].date + " " + getArray[i].start,
                            end: getArray[i].date + " " + getArray[i].end,
                            allDay: false,
                        });
                    }
                }
            }
        }
    });

    calendar.render();


})

