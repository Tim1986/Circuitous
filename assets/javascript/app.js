var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

// grabbing form variables

var activityName = $('#activity-name').val()
var startTime = $('#start-time').val()
var endTime = $('#end-time').val()
var duration = 8.3

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


var data ={
    labels: [],
    datasets: [{
        label: 'Activitie Durations',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 00, 132)',
        data: [whitespaceVar]
    }]
}



var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset

    data: data,

    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'My First dataset',
            //TDB: Sigh, I want to get more colors in there, but chart.js is sadly not easy to work with in this area. We'll return to this later. I think we'll have to just use CSS for it.
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            //TDB: I'm leaving this commented out for now because it isn't cooperating and I'm not sure we even want it.
            // borderColor: [
            //     // 'rgba(255, 99, 132, 0.2)',
            //     'rgba(0, 0, 0)'
            // ],
            data: [0, 10, 5, 2, 20, 30]
        }]
    },

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
    addData(chart, activityName, duration)

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

});

var newActivity = {
    activityName: $("#activity-name").val().trim(),
    activityDate: $("#activity-date").val().trim(),
    startTime: $("#start-time").val().trim(),
    endTime: $("#activity-name").val().trim(),
    activityDuration: $("#activity-duration").val().trim(),
    activityDescription: $("#activity-name").val().trim(),
}


$(document).on("load", function (){
    var calendarEl = document.getElementById('calendar-goes-here');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ]
  });

  calendar.render();
});
