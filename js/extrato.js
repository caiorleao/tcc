$("#datepicker").datepicker();

var options1 = {
    series: [44, 55, 41, 17],
    colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
    foreColor: '#ffffff',
    chart: {
        type: 'donut',
    },
    plotOptions: {
        pie: {
            customScale: 0.9
        }
    }
};
var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
chart1.render();

$(document).on('input', '#value', function () {
    let value = $(this).val()
    value > 0 ? $('#valuePrice').removeClass('text-red').addClass('text-green') : $('#valuePrice').removeClass('text-green').addClass('text-red')
    $('#valuePrice').html('R$' + $(this).val() + ',00');
});