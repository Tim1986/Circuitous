var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
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
            }
        }
    }
});

var newActivity = {
    activityName: $("#activity-name").val().trim(),
    activityDate: $("#activity-date").val().trim(),
    startTime: $("#start-time").val().trim(),
    endTime: $("#activity-name").val().trim(),
    activityDuration: $("#activity-duration").val().trim(),
    activityDescription: $("#activity-name").val().trim(),
}
