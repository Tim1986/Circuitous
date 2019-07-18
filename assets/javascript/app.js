var ctx = $('#chart-canvas')
var ctx = document.getElementById('chart-canvas').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
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