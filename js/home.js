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
    let mtAgressivo = ['<p>Ao comprar ações, o investidor passa a ser <span class="text-yellow">sócio de uma empresa.</span> Ou seja, ele investe no crescimento de um negócio para lucrar mais tarde quando o projeto tiver alcançado êxito. Tradicionalmente, é o meio mais comum de enriquecer investindo. Quando uma empresa abre seu capital na Bolsa de Valores, dizemos se tratar de um <span class="text-yellow">IPO, ou Oferta Pública Inicial</span>, um tipo de jogada que geralmente atrai muitos investidores agressivos. Há diversos tipos de IPO que ofertam, não só ações, mas também cotas de fundos de investimentos ao mercado. <span class="text-yellow">Clique aqui</span> para aprender mais com nossos parceiros</p>']
    let agressivo = ['<p>Ao comprar ações, o investidor passa a ser <span class="text-yellow">sócio de uma empresa.</span> Ou seja, ele investe no crescimento de um negócio para lucrar mais tarde quando o projeto tiver alcançado êxito. Tradicionalmente, é o meio mais comum de enriquecer investindo. Quando uma empresa abre seu capital na Bolsa de Valores, dizemos se tratar de um <span class="text-yellow">IPO, ou Oferta Pública Inicial</span>, um tipo de jogada que geralmente atrai muitos investidores agressivos. Há diversos tipos de IPO que ofertam, não só ações, mas também cotas de fundos de investimentos ao mercado. <span class="text-yellow">Clique aqui</span> para aprender mais com nossos parceiros</p>', '<p>O <span class="text-yellow">Certificado de Depósito Bancário</span> é uma aplicação oferecida por bancos e outras instituições financeiras para a captação de fundos. Assim como um título de tesouro direto, a rentabilidade depende de uma série de fatores. Para quem busca um <span class="text-yellow">CDB</span> pós-fixado e com liquidez diárias, muitos bancos oferecem esse produto com uma <span class="text-yellow">rentabilidade</span> que gira em torno de <span class="text-yellow">100 a 105%</span> do Certificado de Depósito Interbancário (CDI). Quanto mais tempo levar para o saque, maior será o rendimento.</p>']
    let conservador = ['<p>Sua <span class="text-yellow">fatura do cartão de crédito</span> chegou e algumas operadoras mandam recados “amorosos” falando sobre as vantagens de parcelar o valor. Outras enviam faturas com as informações dispostas de forma confusa, de modo que você acredita que pagar somente o valor mínimo não é um grande problema. Seja qual for a sua situação, evite ao máximo fazer o pagamento mínimo da fatura. Se o valor total da sua fatura é de <span class="text-yellow">R$ 1.000,00</span> e você só paga R$ 800,00, por exemplo, o restante (R$ 200,00) é transferido para o próximo mês com <span class="text-yellow">taxas de juros altas.</span></p>', '<p>O <span class="text-yellow">Certificado de Depósito Bancário</span> é uma aplicação oferecida por bancos e outras instituições financeiras para a captação de fundos. Assim como um título de tesouro direto, a rentabilidade depende de uma série de fatores. Para quem busca um <span class="text-yellow">CDB</span> pós-fixado e com liquidez diárias, muitos bancos oferecem esse produto com uma <span class="text-yellow">rentabilidade</span> que gira em torno de <span class="text-yellow">100 a 105%</span> do Certificado de Depósito Interbancário (CDI). Quanto mais tempo levar para o saque, maior será o rendimento.</p>']
    let mtConsevador = ['<span class="text-yellow">Fundos DI</span> Outra alternativa para quem busca um investimento seguro é o fundo DI. Esse é um veículo financeiro coletivo, que conta com gestão profissional e cuja participação depende da compra de cotas pelos investidores. Assim, os recursos do fundo são movimentados por profissionais da área, de acordo com a estratégia definida. No caso do fundo DI, o objetivo é replicar o desempenho do CDI (também conhecido como taxa DI). Para isso, os fundos DI investem a maioria dos recursos em títulos públicos pós-fixados (Tesouro Selic) e em títulos privados que acompanham o CDI. Assim, o resultado do fundo tende a ficar próximo dessa taxa. Uma das principais vantagens dessa modalidade é a liquidez diária. Logo, você pode resgatar as cotas quando desejar, o que ajuda a diminuir os riscos de liquidez. Contudo, os fundos DI não têm proteção do FGC, embora apresentem alta segurança.', '<p>Sua <span class="text-yellow">fatura do cartão de crédito</span> chegou e algumas operadoras mandam recados “amorosos” falando sobre as vantagens de parcelar o valor. Outras enviam faturas com as informações dispostas de forma confusa, de modo que você acredita que pagar somente o valor mínimo não é um grande problema. Seja qual for a sua situação, evite ao máximo fazer o pagamento mínimo da fatura. Se o valor total da sua fatura é de <span class="text-yellow">R$ 1.000,00</span> e você só paga R$ 800,00, por exemplo, o restante (R$ 200,00) é transferido para o próximo mês com <span class="text-yellow">taxas de juros altas.</span></p>']
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