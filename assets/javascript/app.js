var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

// grabbing form variables
var newActivity = {
    activityName: $("#activity-name").val().trim(),
    activityDate: $("#activity-date").val().trim(),
    startTime: $("#start-time").val().trim(),
    endTime: $("#activity-name").val().trim(),
    activityDuration: $("#activity-duration").val().trim(),
    activityDescription: $("#activity-name").val().trim(),
}

// functions for adding and removing activities
function addData(chart, label, data) {
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


var tempArr = []
var placeHolder = {
    duration:  100 - (tempArr.reduce(function(acc, val) { return acc + val; }, 0)),
    name : 'unscheduled time',
}

// The data for our dataset
var data ={
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
        // add whitespace variable and math
    }]
}



var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    data: data,
    
    // Configuration options go here
    options: {
        borderWidth: 50,
        layout:{
            responsive: true,
            maintainAspectRatio: false,
            padding: {
                left: '50px',
                right: '50px',
                top: '50px',
                bottom: '50px',
            },
        }
    }

})


$('#submit-activity').on('click', function(e){
    e.preventDefault()
    console.log('you clicked me')
    addData(chart, newActivity.activityName, 10) //placeholder duration

    //This is to clear our fields after we click submit
    $("#activity-name").val("");
    $("#activity-date").val("");
    $("#start-time").val("");
    $("#end-time").val(""); 
    $("#activity-duration").val("");
    $("#activity-description").val(""); 
})

$('#remove-activity').on('click', function(e){
    e.preventDefault()
    console.log('you clicked me')
    removeData(chart, newActivity.activityName, newActivity.activityDuration)
})




// $(document).on("load", function (){
//     var calendarEl = document.getElementById('calendar-goes-here');

//   var calendar = new Calendar(calendarEl, {
//     plugins: [ dayGridPlugin ]
//   });

//   calendar.render();
// });
