var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

// grabbing form variables

var activityName = $('#activity-name').val()
var startTime = $('#start-time').val()
var endTime = $('#end-time').val()
var duartion = 8.3

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
        data: []
    }]
}



var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
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
    addData(chart, newActivity.activityName, newActivity.activityDuration)
    

})
$('#remove-activity').on('click', function(e){
    e.preventDefault()
    console.log('you clicked me')
    removeData(chart, newActivity.activityName, newActivity.activityDuration)
})