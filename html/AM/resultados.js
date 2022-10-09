var options = {
    series: [24, 10, 20],
    labels: ['JavaScript', 'Cultura', 'Inglês'],
    chart: {
        type: 'polarArea',
    },
    stroke: {
        colors: ['#fff']
    },
    fill: {
        opacity: 0.8
    },
    responsive: [{
        breakpoint: 480,
        options: {
            foreColor: '#FFFFFF',
            chart: {
                width: 200,
                foreColor: '#FFFFFF',
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();