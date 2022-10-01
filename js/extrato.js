$("#datepicker").datepicker();
var configs = {
    'overlayBackgroundColor': '#1e1e1e',
    'overlayOpacity': 0.3,
    'spinnerIcon': 'ball-spin',
    'spinnerColor': '#eac43d',
    'spinnerSize': '2x',
    'overlayIDName': 'overlay',
    'spinnerIDName': 'spinner',
    'offsetY': 0,
    'offsetX': 0,
    'lockScroll': false,
    'containerID': null,
};
//JsLoadingOverlay.show(configs);
//JsLoadingOverlay.hide();
var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
let selectedMeta
loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
    JsLoadingOverlay.show(configs);
    if (localStorage.getItem('user') && localStorage.getItem('hasUpdated') != "true") {
        $(".user-name").text(JSON.parse(localStorage.getItem('user')).nome)
        loadAccounts(JSON.parse(localStorage.getItem('accounts')))
        loadExtract(userData)
        loadGoals(userData)
    } else {
        var settings = {
            "url": "https://rest-api-startupone.herokuapp.com/usuarios/pesquisar/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            if (data.response.usuario.length >= 0) {
                localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
                $(".user-name").text(data.response.usuario[0].nome)
                loadAccounts(data.response.usuario[0])
                loadExtract(userData)
                loadGoals(userData)
                localStorage.removeItem('hasUpdated')

            }
        });
    }
    JsLoadingOverlay.hide();
}

function loadAccounts(userData) {
    if (localStorage.getItem('user') && localStorage.getItem('hasUpdated') != "true") {
        let saldo = 0,
            accountTokens = []
        JSON.parse(localStorage.getItem('accounts')).response.forEach(account => {
            saldo += account.saldo
            accountTokens.push({ 'name': account.banco, 'token': account.token })
            $('#account').append(`<option value="${account.idconta}">${account.banco}</option>`)
        });
        $(".accounts-total").text(PriceFormatter.format(saldo))

    } else {
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/contas/usuariocontas/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            let saldo = 0,
                accountTokens = []
            data.response.forEach(account => {
                saldo += account.saldo
                accountTokens.push({ 'name': account.banco, 'token': account.token })
                $('#account').append(`<option value="${account.idconta}">${account.banco}</option>`)
            });
            $(".accounts-total").text(PriceFormatter.format(saldo))
            localStorage.setItem('saldo', saldo)

        });
    }
}

function loadGoals(user) {
    if (localStorage.getItem('goals') && localStorage.getItem('hasUpdated') != "true") {
        JSON.parse(localStorage.getItem('goals')).response.forEach(goal => {
            $('#category').append(`<option value="Meta - ${goal.titulo}" data-id="${goal.idmeta}" data-current="${goal.vl_atual}">Meta - ${goal.titulo}</option>`)
        })
    } else {
        var settings = {
            "url": "https://rest-api-startupone.herokuapp.com/metas/carregar/" + user.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            localStorage.setItem('goals', JSON.stringify(data))
            data.response.forEach(goal => {
                $('#category').append(`<option value="Meta - ${goal.titulo}" data-id="${goal.metaId}" data-current="${goal.vl_atual}">Meta - ${goal.titulo}</option>`)
            })
        });
    }

}

function loadExtract(user) {
    if (localStorage.getItem('extracts') && localStorage.getItem('hasUpdated') != "true") {
        let santander = { name: 'Santander', data: [] },
            xpInvestimentos = { name: 'XP Investimentos', data: [] },
            bradesco = { name: 'Bradesco', data: [] },
            alimentacao = 0,
            transporte = 0,
            lazer = 0,
            metas = 0,
            totalGasto = 0,
            valor = 0,
            sortedData = JSON.parse(localStorage.getItem('extracts')).response.sort(function (a, b) {
                var aa = a.dt.split('/').reverse().join(),
                    bb = b.dt.split('/').reverse().join();
                return aa > bb ? -1 : (aa < bb ? 1 : 0);
            });

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
                    case extract.categoria.includes('Meta'):
                        metas += valor
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
                    <span class="extractPercentage ${extract.valor >= 0 ? 'text-green' : 'text-red'}">${PriceFormatter.format(extract.valor)}</span>
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
            series: [percentage(alimentacao, totalGasto), percentage(transporte, totalGasto), percentage(lazer, totalGasto), percentage(metas, totalGasto)],
            labels: ['Alimentação', 'Transporte', 'Lazer', "Metas"],
            colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
            foreColor: '#ffffff',
            chart: {
                type: 'donut',
            },
            width: '100%'
        };
        var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
        chart1.render();
    } else {
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
                metas = 0,
                totalGasto = 0,
                valor = 0,
                sortedData = data.response.sort(function (a, b) {
                    var aa = a.dt.split('/').reverse().join(),
                        bb = b.dt.split('/').reverse().join();
                    return aa > bb ? -1 : (aa < bb ? 1 : 0);
                });
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
                        case extract.categoria.includes('Meta'):
                            metas += valor
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
                            <span class="extractPercentage ${extract.valor >= 0 ? 'text-green' : 'text-red'}">${PriceFormatter.format(extract.valor)}</span>
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
                series: [percentage(alimentacao, totalGasto), percentage(transporte, totalGasto), percentage(lazer, totalGasto), percentage(metas, totalGasto)],
                labels: ['Alimentação', 'Transporte', 'Lazer', "Metas"],
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


}

$('#addInOut').on('click', function () {
    if ($('#title').val() != '' && $('#value').val() != 0 && $('#datepicker').val() != '' && $('#account').val()) {
        $('.inoutButton').removeClass('show') 
        JsLoadingOverlay.show(configs);
        let lancamento = {
            "titulo": $('#title').val(),
            "categoria": $('#category option:selected').val(),
            "valor": $('#value').val(),
            "data": $('#datepicker').val()
        }
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/extratos/cadastro/" + $('#account').val(),
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(lancamento),
        };

        $.ajax(settings).done(function (data) {
            selectedMeta = $('#category option:selected').text().includes("Meta") ? true : false
            if (!data.error) {
                updateSaldo()
            }
        });
    } else {
        $('.errroInOut').addClass('show') 
    }
})

function updateSaldo() {

    var settings = {
        "url": "https://rest-api-startupone.herokuapp.com/contas/alterarSaldo/" + $('#account').val() + "/+" + $('#value').val(),
        "method": "PATCH",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.message = "Saldo alterado com sucesso!!") {
            if (selectedMeta) {
                updateMeta()
            } else {
                localStorage.setItem('hasUpdated', 'true')
                location.reload()
            }
        }
    });
}

function updateMeta() {
    let metaId = $('#category option:selected').attr('data-id')
    let newValue = parseInt($('#category option:selected').attr('data-current')) + parseInt($('#value').val())
    var settings = {
        "url": "https://rest-api-startupone.herokuapp.com/metas/alterarValor/" + metaId + "/" + newValue,
        "method": "PATCH",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        localStorage.setItem('hasUpdated', 'true')
        location.reload()
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