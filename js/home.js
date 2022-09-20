// import Swiper JS
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

var options1 = {
    series: [44, 55, 41, 17],
    colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
    foreColor: '#ffffff',
    chart: {
        type: 'donut',
    },
    width: '100%'
};
var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
chart1.render();


var options2 = {
    grid: {
        borderColor: '#f1f1f1',
    },
    colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
    foreColor: '#ffffff',
    series: [{
        name: "Santander",
        data: [1000, 1219, 1523, 2900, 1101, 1798]
    },
    {
        name: "Caixa",
        data: [200, 1311, 1400, 2000, 2101, 2798]
    },
    {
        name: "Neon",
        data: [10, 200, 20, 100, 111, 198]
    }
    ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [5, 7, 5],
        curve: 'smooth',
        dashArray: [0, 8, 5]
    },
    legend: {
        tooltipHoverFormatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        }
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01 Jan', '01 Fev', '01 Mar', '01 Abr', '01 Mai', '01 Jun', '01 Jul', '01 Ago', '01 Set', '01 Out', '01 Nov', '01 Dez'],
    },
    tooltip: {
        y: [
            {
                title: {
                    formatter: function (val) {
                        return val + " Reais"
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val + " Reais"
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val + " Reais";
                    }
                }
            }
        ]
    },
};
var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

// init Swiper:
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});