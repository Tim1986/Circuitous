var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

// grabbing form variables
var activityName = $('activity-name').val()
var startTime = $('start-time').val()
var endTime = $


function pushData(){
    data.labels.append(activityName)

}

var data ={
    labels: [],
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 00, 132)',
        data: [0, 10, 5, 2, 20, 30, 45]
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