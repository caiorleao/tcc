$("#datepicker").datepicker();

var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/usuarios/pesquisar/" + userData.id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.usuario.length >= 0) {
            localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
            $(".user-name").text(data.response.usuario[0].nome)
            loadExtract(userData)
        }
    });
}

function loadExtract(user) {
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/extratos/carregar/" + user.id,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (data) {
        let santander = { name: 'Santander', data: [] },
            xpInvestimentos = { name: 'XP Investimentos', data: [] },
            bradesco = { name: 'Bradesco', data: [] },
            alimentacao = 0,
            transporte = 0,
            lazer = 0,
            investimento = 0,
            totalGasto = 0,
            valor = 0,
            sortedData = data.response.sort((a, b) => new Date(b.dt) - new Date(a.dt))
        sortedData.forEach(extract => {
            if (extract.valor < 0) {
                valor = (extract.valor) * (-1)
                switch (extract.banco) {
                    case 'Santander':
                        santander.data.push(valor)
                        break;
                    case 'XP Investimentos':
                        xpInvestimentos.data.push(valor)
                        break;
                    case 'Bradesco':
                        bradesco.data.push(valor)
                        break;
                    default:
                        break;
                }
                switch (extract.categoria) {
                    case 'Alimentação':
                        alimentacao += valor
                        break;
                    case 'Transporte':
                        transporte += valor
                        break;
                    case 'Lazer':
                        lazer += valor
                        break;
                    case 'Investimento':
                        investimento += valor
                        break;
                    default:
                        break;
                }
                totalGasto += valor
            }
            $('.extracts').append(`
                <div class="extract-info">
                    <div class="extractData">
                        <span class="extractTitle data text-yellow">${extract.titulo}</span>
                        <span class="extractCategory data text-blue-bright">${extract.categoria}</span>
                        <span class="extractDate data text-gray-secondary">
                        <span class="extractBank">${extract.banco}</span> - ${extract.dt}</span>
                    </div>
                    <div class="extractValues">
                        <span class="extractPercentage ${extract.valor >= 0 ? 'text-green': 'text-red'}">${PriceFormatter.format(extract.valor)}</span>
                    </div>
                </div>
              `)
        });

        let banks = []
        santander.data.length > 0 ? banks.push(santander) : ''
        xpInvestimentos.data.length > 0 ? banks.push(xpInvestimentos) : ''
        bradesco.data.length > 0 ? banks.push(bradesco) : ''

        //DONU
        var options1 = {
            series: [percentage(alimentacao, totalGasto), percentage(transporte, totalGasto), percentage(lazer, totalGasto), percentage(investimento, totalGasto)],
            labels: ['Alimentação', 'Transporte', 'Lazer', "Investimento"],
            colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
            foreColor: '#ffffff',
            chart: {
                type: 'donut',
            },
            width: '100%'
        };
        var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
        chart1.render();
    });


}

$(document).on('input', '#value', function () {
    let value = $(this).val()
    value > 0 ? $('#valuePrice').removeClass('text-red').addClass('text-green') : $('#valuePrice').removeClass('text-green').addClass('text-red')
    $('#valuePrice').html('R$' + $(this).val() + ',00');
});

var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}