// import Swiper JS
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
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';
var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
    JsLoadingOverlay.show(configs)
    $(".user-name").text(userData.nome)
    loadAccounts(userData)
    loadExtract(userData)
    loadInvestorTips(userData)
    loadGoals(userData)
}

function loadAccounts(userData) {
    if (localStorage.getItem('accounts')) {
        let saldo = 0,
            accountTokens = []
        JSON.parse(localStorage.getItem('accounts')).response.forEach(account => {
            saldo += account.saldo
            accountTokens.push({ 'name': account.banco, 'token': account.token })
        });
        $(".accounts-total").text(PriceFormatter.format(localStorage.getItem('saldo')))
    } else {
        var settings = {
            "url": "localhost:3000/contas/usuariocontas/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            localStorage.setItem('accounts', JSON.stringify(data))
            let saldo = 0,
                accountTokens = []
            data.response.forEach(account => {
                saldo += account.saldo
                accountTokens.push({ 'name': account.banco, 'token': account.token })
            });
            $(".accounts-total").text(PriceFormatter.format(localStorage.getItem('saldo')))
            localStorage.setItem('saldo', saldo)
        });
    }
}

function loadExtract(userData) {
    if (localStorage.getItem('extracts')) {
        let santander = { name: 'Santander', data: [] },
            xpInvestimentos = { name: 'XP Investimentos', data: [] },
            bradesco = { name: 'Bradesco', data: [] },
            alimentacao = 0,
            transporte = 0,
            lazer = 0,
            investimento = 0,
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
                if (extract.banco == "Santander") {
                    santander.data.push(valor)
                } else if (extract.banco == "XP Investimentos") {
                    xpInvestimentos.data.push(valor)
                } else if (extract.banco == "Bradesco") {
                    bradesco.data.push(valor)
                }

                if (extract.categoria == 'Alimentação') {
                    alimentacao += valor
                } else if (extract.categoria == 'Transporte') {
                    transporte += valor
                } else if (extract.categoria == 'Lazer') {
                    lazer += valor
                } else if (extract.categoria.includes('Meta')) {
                    investimento += valor
                }

                totalGasto += valor
            }

        });

        let banks = []
        santander.data.length > 0 ? banks.push(santander) : ''
        xpInvestimentos.data.length > 0 ? banks.push(xpInvestimentos) : ''
        bradesco.data.length > 0 ? banks.push(bradesco) : ''

        //GRAFICO
        var options2 = {
            grid: {
                borderColor: '#f1f1f1',
            },
            colors: ['#eac43d', '#2a5c99', '#001b48'],
            foreColor: '#ffffff',
            series: banks,
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                foreColor: '#FFFFFF'
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
                categories: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10', '08/10', '09/10', '10/10', '12/10', '13/10', '14/10', '15/10', '16/10', '17/10', '18/10', '19/10', '20/10', '21/10', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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

        //DONU
        var options1 = {
            series: [percentage(alimentacao, totalGasto), percentage(transporte, totalGasto), percentage(lazer, totalGasto), percentage(investimento, totalGasto)],
            labels: ['Alimentação', 'Transporte', 'Lazer', "Metas"],
            colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
            foreColor: '#ffffff',
            chart: {
                type: 'donut',
                foreColor: '#FFFFFF'
            },
            width: '100%'
        };
        var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
        chart1.render();
    } else {
        var settings = {
            "url": "localhost:3000/extratos/carregar/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            localStorage.setItem('extracts', JSON.stringify(data))
            let santander = { name: 'Santander', data: [] },
                xpInvestimentos = { name: 'XP Investimentos', data: [] },
                bradesco = { name: 'Bradesco', data: [] },
                alimentacao = 0,
                transporte = 0,
                lazer = 0,
                investimento = 0,
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
                    if (extract.banco == "Santander") {
                        santander.data.push(valor)
                    } else if (extract.banco == "XP Investimentos") {
                        xpInvestimentos.data.push(valor)
                    } else if (extract.banco == "Bradesco") {
                        bradesco.data.push(valor)
                    }

                    if (extract.categoria == 'Alimentação') {
                        alimentacao += valor
                    } else if (extract.categoria == 'Transporte') {
                        transporte += valor
                    } else if (extract.categoria == 'Lazer') {
                        lazer += valor
                    } else if (extract.categoria.includes('Meta')) {
                        investimento += valor
                    }
                    totalGasto += valor
                }
            });

            let banks = []
            santander.data.length > 0 ? banks.push(santander) : ''
            xpInvestimentos.data.length > 0 ? banks.push(xpInvestimentos) : ''
            bradesco.data.length > 0 ? banks.push(bradesco) : ''

            //GRAFICO
            var options2 = {
                grid: {
                    borderColor: '#f1f1f1',
                },
                colors: ['#eac43d', '#2a5c99', '#001b48'],
                foreColor: '#ffffff',
                series: banks,
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    foreColor: '#FFFFFF'
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
                    categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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

            //DONU
            var options1 = {
                series: [percentage(alimentacao, totalGasto), percentage(transporte, totalGasto), percentage(lazer, totalGasto), percentage(investimento, totalGasto)],
                labels: ['Alimentação', 'Transporte', 'Lazer', "Metas"],
                colors: ['#eac43d', '#2a5c99', '#001b48', '#242e38'],
                foreColor: '#ffffff',
                chart: {
                    type: 'donut',
                    foreColor: '#FFFFFF'
                },
                width: '100%'
            };
            var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
            chart1.render();
        });
    }


}

function loadInvestorTips(user) {
    let mtAgressivo = ['Sabendo ', 'Etiam tristique nisl augue, ornare pharetra neque ornare at. Donec odio ligula, pellentesque vitae sem a, pulvinar placerat risus. Sed ac venenatis elit. Praesent tincidunt mattis elit at tempus. Aenean eleifend interdum dui. Suspendisse id commodo ante, sit amet sagittis nisl. Duis dignissim hendrerit laoreet. Nunc vel risus lectus.']
    let agressivo = ['Curabitur id elit et dolor bibendum porttitor. Duis porta augue eros, a ultrices nunc porta sed. Nulla facilisi. Integer metus neque, placerat sed tincidunt id, lobortis vitae velit. Suspendisse rutrum laoreet sapien eget laoreet. Cras vitae massa in ligula sollicitudin iaculis. In sit amet justo sit amet diam sodales egestas eu ut velit.', 'Donec ut volutpat purus, vel vestibulum tortor. Sed nec magna non orci mollis aliquet. In aliquet, libero ac hendrerit fermentum, metus nulla ultricies elit, at egestas massa metus non erat. Morbi mattis, eros quis bibendum ultricies, orci tellus tincidunt augue, in aliquam enim sapien sodales ipsum. Integer orci mi, rhoncus vitae libero in, fermentum pellentesque purus. Nunc nec venenatis erat. Nulla eu maximus diam, facilisis elementum nisi. Ut pulvinar placerat sagittis. Etiam ac mauris odio. Sed posuere erat sed pretium auctor. Proin id nibh ut tortor vehicula tempor. Etiam vel risus a magna blandit placerat non in nunc.', 'Praesent rhoncus consequat mi, et laoreet lectus molestie in. Ut placerat tellus eget placerat porttitor. Nullam vitae efficitur tortor, in elementum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus fermentum ullamcorper dui, vel varius urna tincidunt et. Suspendisse id quam velit. Morbi et hendrerit elit, nec porta orci. Morbi in leo facilisis nisi dignissim consectetur ac ut purus.']
    let conservador = ['<p>Sua <span class="text-yellow">fatura do cartão de crédito</span> chegou e algumas operadoras mandam recados “amorosos” falando sobre as vantagens de parcelar o valor. Outras enviam faturas com as informações dispostas de forma confusa, de modo que você acredita que pagar somente o valor mínimo não é um grande problema. Seja qual for a sua situação, evite ao máximo fazer o pagamento mínimo da fatura. Se o valor total da sua fatura é de <span class="text-yellow">R$ 1.000,00</span> e você só paga R$ 800,00, por exemplo, o restante (R$ 200,00) é transferido para o próximo mês com <span class="text-yellow">taxas de juros altas.</span></p>', 'Nullam at nisl in justo rutrum efficitur ac et odio. Cras et ante magna. Fusce eleifend molestie pulvinar. Duis consequat dignissim sem, a congue libero sodales at. Nam vehicula mi eros. Nunc imperdiet tristique euismod. Aliquam sollicitudin tempor orci, vitae varius ipsum accumsan non.', 'Phasellus urna odio, sagittis nec tempus nec, molestie sollicitudin risus. Ut faucibus faucibus venenatis. Nulla et commodo felis, et dignissim diam. Pellentesque ut justo eget arcu pretium sodales sed id urna. Suspendisse in commodo diam, id tincidunt nisl. Nam nec lorem ac ligula elementum vestibulum et eget urna. Aliquam eget nunc fringilla arcu fermentum elementum sit amet sed felis. Vivamus vel metus congue velit vestibulum iaculis. Quisque ut fringilla massa. Maecenas elementum tellus metus, ac varius tortor fermentum venenatis.']
    let mtConsevador = ['Donec tristique, augue at sagittis pharetra, ex enim sodales libero, at volutpat sem tellus vehicula eros. Pellentesque et ullamcorper arcu. Donec consectetur nisi eu velit hendrerit semper. Praesent et lorem sed ante lacinia ultrices. Mauris est magna, ullamcorper id tellus vitae, ultricies maximus libero. Sed laoreet augue non placerat egestas. Fusce et purus vitae ante imperdiet auctor vel et purus.', 'Donec sapien justo, vehicula non est vitae, congue tristique nunc. Duis in enim placerat, placerat ex non, maximus tortor. Nunc condimentum quam eget lacus convallis, eget scelerisque tellus lacinia. Maecenas ac luctus felis, vel tincidunt turpis. Donec congue odio sit amet laoreet rutrum.', 'Curabitur malesuada ornare elit, et mattis felis. Aenean lobortis, ipsum id egestas imperdiet, eros nisi cursus magna, vel placerat neque lorem a nisi. Suspendisse odio tellus, aliquet eget cursus at, tristique quis dolor. Nullam maximus, ex non molestie dignissim, urna ante tempor orci, et commodo urna eros ac elit. Morbi fermentum dignissim magna, at viverra elit condimentum eget. Sed consequat mauris nec ante accumsan laoreet. Vestibulum in erat nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed facilisis venenatis dui eget iaculis.']
    switch (user.perfilinvestidor) {
        case 'Muito agressivo':
            $(".swiper-slide").each(function (index) {
                $(this).append(mtAgressivo[index])
            });
            break;
        case 'Agressivo':
            $(".swiper-slide").each(function (index) {
                $(this).append(agressivo[index])
            });
            break;
        case 'Conservador':
            $(".swiper-slide").each(function (index) {
                $(this).append(conservador[index])
            });
            break;
        case 'Muito conservador':
            $(".swiper-slide").each(function (index) {
                $(this).append(mtConsevador[index])
            });
            break;

        default:
            break;
    }
}

function loadGoals(user) {
    if (localStorage.getItem('goals')) {
        let porcentagem
        JSON.parse(localStorage.getItem('goals')).response.forEach(goal => {
            porcentagem = percentage(goal.vl_atual, goal.vl_total)
            $('.goals').append(`
              <div class="progressSection">
                  <div class="progress-info">
                      <div class="goalData">
                          <span class="goalTitle data text-yellow">${goal.titulo}</span>
                          <span class="goalCategory data text-blue-bright">${goal.categoria}</span>
                          <span class="goalDate data text-gray-secondary">${goal.recorrencia} - ${goal.dt_lancamento}</span>
                      </div>
                      <div class="goalValues">
                      <span class="goalCurrentValue text-gray-secondary">${goal.vl_atual < 0 ? PriceFormatter.format(0) : PriceFormatter.format(goal.vl_atual)}</span>
                      <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                          <span class="goalPercentage text-yellow">- ${goal.vl_atual < 0 ? 0 : Math.round(porcentagem)}%</span>
                      </div>
                  </div>
                  <div class="progress" id="${goal.titulo}">
                      <div class="progress-bar" role="progressbar" style="width: ${goal.vl_atual < 0 ? 0 : porcentagem}%"
                          aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              `)
        })
        JsLoadingOverlay.hide()
    } else {
        var settings = {
            "url": "localhost:3000/metas/carregar/" + user.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            localStorage.setItem('goals', JSON.stringify(data))
            let porcentagem
            data.response.forEach(goal => {
                porcentagem = percentage(goal.vl_atual, goal.vl_total)
                $('.goals').append(`
                  <div class="progressSection">
                      <div class="progress-info">
                          <div class="goalData">
                              <span class="goalTitle data text-yellow">${goal.titulo}</span>
                              <span class="goalCategory data text-blue-bright">${goal.categoria}</span>
                              <span class="goalDate data text-gray-secondary">${goal.recorrencia} - ${goal.dt_lancamento}</span>
                          </div>
                          <div class="goalValues">
                              <span class="goalCurrentValue text-gray-secondary">${goal.vl_atual < 0 ? PriceFormatter.format(0) : PriceFormatter.format(goal.vl_atual)}</span>
                              <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                              <span class="goalPercentage text-yellow">- ${goal.vl_atual < 0 ? 0 : Math.round(porcentagem)}%</span>
                          </div>
                      </div>
                      <div class="progress" id="${goal.titulo}">
                          <div class="progress-bar" role="progressbar" style="width: ${goal.vl_atual < 0 ? 0 : porcentagem}%"
                              aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                  </div>
                  `)
            })
            JsLoadingOverlay.hide()

        });
    }

}


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

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}