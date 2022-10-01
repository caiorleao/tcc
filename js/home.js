// import Swiper JS

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';
var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
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
        $(".accounts-total").text(PriceFormatter.format(saldo))
    } else {
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/contas/usuariocontas/" + userData.id,
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
            $(".accounts-total").text(PriceFormatter.format(saldo))
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
            sortedData = JSON.parse(localStorage.getItem('extracts')).response.sort((a, b) => new Date(a.dt) - new Date(b.dt))
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
    } else {
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/extratos/carregar/" + userData.id,
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
                sortedData = data.response.sort((a, b) => new Date(a.dt) - new Date(b.dt))
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


}

function loadInvestorTips(user) {
    let mtAgressivo = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien diam, congue vel vestibulum et, finibus a turpis. Praesent fringilla aliquet posuere. Aliquam in metus at nunc vestibulum varius. Proin ullamcorper velit diam, ac egestas dolor accumsan nec. Praesent at arcu laoreet, auctor massa a, egestas nibh. Etiam pulvinar ultricies tincidunt. Mauris auctor et ligula eget blandit. Donec consectetur consequat varius. Sed vehicula ornare elit in gravida. Curabitur ornare arcu vitae magna pretium, eget luctus sapien volutpat. Curabitur blandit eros est, nec congue urna aliquam eu. Cras posuere nulla porttitor, placerat felis at, tincidunt turpis. In hac habitasse platea dictumst. Mauris luctus turpis libero.', 'Cras eu mollis erat. Nam sed enim aliquam, fermentum erat quis, blandit enim. Duis id dapibus tortor, vel ornare risus. Mauris id orci sed felis porttitor volutpat. Duis euismod lectus a aliquet tempus. Aenean porttitor mi metus, sit amet scelerisque elit placerat sed. Proin nec urna dictum, condimentum ipsum id, vehicula tortor. Morbi et orci eu eros varius fringilla eu quis sem. Nullam sit amet felis pretium, vehicula nulla non, consequat dui. Vivamus vitae purus gravida, lacinia massa ac, venenatis felis. Fusce in est eu lacus faucibus bibendum eget quis odio. In congue a ipsum at lobortis. Nulla commodo, elit eget dictum vestibulum, elit mi euismod orci, vitae convallis urna orci ut tellus. Etiam ultricies venenatis dolor, eget blandit odio feugiat ut. Phasellus elementum eros venenatis porttitor fringilla. Suspendisse quis euismod leo.', 'Etiam tristique nisl augue, ornare pharetra neque ornare at. Donec odio ligula, pellentesque vitae sem a, pulvinar placerat risus. Sed ac venenatis elit. Praesent tincidunt mattis elit at tempus. Aenean eleifend interdum dui. Suspendisse id commodo ante, sit amet sagittis nisl. Duis dignissim hendrerit laoreet. Nunc vel risus lectus.']
    let agressivo = ['Curabitur id elit et dolor bibendum porttitor. Duis porta augue eros, a ultrices nunc porta sed. Nulla facilisi. Integer metus neque, placerat sed tincidunt id, lobortis vitae velit. Suspendisse rutrum laoreet sapien eget laoreet. Cras vitae massa in ligula sollicitudin iaculis. In sit amet justo sit amet diam sodales egestas eu ut velit.', 'Donec ut volutpat purus, vel vestibulum tortor. Sed nec magna non orci mollis aliquet. In aliquet, libero ac hendrerit fermentum, metus nulla ultricies elit, at egestas massa metus non erat. Morbi mattis, eros quis bibendum ultricies, orci tellus tincidunt augue, in aliquam enim sapien sodales ipsum. Integer orci mi, rhoncus vitae libero in, fermentum pellentesque purus. Nunc nec venenatis erat. Nulla eu maximus diam, facilisis elementum nisi. Ut pulvinar placerat sagittis. Etiam ac mauris odio. Sed posuere erat sed pretium auctor. Proin id nibh ut tortor vehicula tempor. Etiam vel risus a magna blandit placerat non in nunc.', 'Praesent rhoncus consequat mi, et laoreet lectus molestie in. Ut placerat tellus eget placerat porttitor. Nullam vitae efficitur tortor, in elementum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus fermentum ullamcorper dui, vel varius urna tincidunt et. Suspendisse id quam velit. Morbi et hendrerit elit, nec porta orci. Morbi in leo facilisis nisi dignissim consectetur ac ut purus.']
    let conservador = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus urna, elementum eget urna a, aliquet dictum nisl. Aliquam congue mauris tortor, id semper eros sollicitudin sed. Nunc vestibulum faucibus nibh, id congue lorem sollicitudin at. Vestibulum elit ex, aliquam vitae ligula vel, aliquet mattis leo. Curabitur non mi bibendum mauris finibus varius. Vestibulum nec nulla nec enim gravida tincidunt a vitae tellus. Nunc hendrerit aliquet metus a mattis. Donec quis arcu vel neque vehicula finibus. Pellentesque sit amet urna et tortor pulvinar congue. Proin porttitor erat justo, a mattis mauris efficitur ut. Nulla mollis cursus orci, in venenatis mauris.', 'Nullam at nisl in justo rutrum efficitur ac et odio. Cras et ante magna. Fusce eleifend molestie pulvinar. Duis consequat dignissim sem, a congue libero sodales at. Nam vehicula mi eros. Nunc imperdiet tristique euismod. Aliquam sollicitudin tempor orci, vitae varius ipsum accumsan non.', 'Phasellus urna odio, sagittis nec tempus nec, molestie sollicitudin risus. Ut faucibus faucibus venenatis. Nulla et commodo felis, et dignissim diam. Pellentesque ut justo eget arcu pretium sodales sed id urna. Suspendisse in commodo diam, id tincidunt nisl. Nam nec lorem ac ligula elementum vestibulum et eget urna. Aliquam eget nunc fringilla arcu fermentum elementum sit amet sed felis. Vivamus vel metus congue velit vestibulum iaculis. Quisque ut fringilla massa. Maecenas elementum tellus metus, ac varius tortor fermentum venenatis.']
    let mtConsevador = ['Donec tristique, augue at sagittis pharetra, ex enim sodales libero, at volutpat sem tellus vehicula eros. Pellentesque et ullamcorper arcu. Donec consectetur nisi eu velit hendrerit semper. Praesent et lorem sed ante lacinia ultrices. Mauris est magna, ullamcorper id tellus vitae, ultricies maximus libero. Sed laoreet augue non placerat egestas. Fusce et purus vitae ante imperdiet auctor vel et purus.', 'Donec sapien justo, vehicula non est vitae, congue tristique nunc. Duis in enim placerat, placerat ex non, maximus tortor. Nunc condimentum quam eget lacus convallis, eget scelerisque tellus lacinia. Maecenas ac luctus felis, vel tincidunt turpis. Donec congue odio sit amet laoreet rutrum.', 'Curabitur malesuada ornare elit, et mattis felis. Aenean lobortis, ipsum id egestas imperdiet, eros nisi cursus magna, vel placerat neque lorem a nisi. Suspendisse odio tellus, aliquet eget cursus at, tristique quis dolor. Nullam maximus, ex non molestie dignissim, urna ante tempor orci, et commodo urna eros ac elit. Morbi fermentum dignissim magna, at viverra elit condimentum eget. Sed consequat mauris nec ante accumsan laoreet. Vestibulum in erat nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed facilisis venenatis dui eget iaculis.']
    switch (user.perfilinvestidor) {
        case 'Muito agressivo':
            $(".swiper-slide p").each(function (index) {
                $(this).text(mtAgressivo[index])
            });
            break;
        case 'Agressivo':
            $(".swiper-slide p").each(function (index) {
                $(this).text(agressivo[index])
            });
            break;
        case 'Conservador':
            $(".swiper-slide p").each(function (index) {
                $(this).text(conservador[index])
            });
            break;
        case 'Muito conservador':
            $(".swiper-slide p").each(function (index) {
                $(this).text(mtConsevador[index])
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
                          <span class="goalCurrentValue text-gray-secondary">${PriceFormatter.format(goal.vl_atual)}</span>
                          <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                          <span class="goalPercentage text-yellow">- ${Math.round(porcentagem)}%</span>
                      </div>
                  </div>
                  <div class="progress" id="${goal.titulo}">
                      <div class="progress-bar" role="progressbar" style="width: ${porcentagem}%"
                          aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              `)
        })
    } else {
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/metas/carregar/" + user.id,
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
                              <span class="goalCurrentValue text-gray-secondary">${PriceFormatter.format(goal.vl_atual)}</span>
                              <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                              <span class="goalPercentage text-yellow">- ${Math.round(porcentagem)}%</span>
                          </div>
                      </div>
                      <div class="progress" id="${goal.titulo}">
                          <div class="progress-bar" role="progressbar" style="width: ${porcentagem}%"
                              aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                  </div>
                  `)
            })
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