const groupBy = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);
loadResults()
function loadResults() {
    var settings = {
        "url": "https://rest-api-ey.herokuapp.com/candidatos/progress/"+JSON.parse(localStorage.getItem('user')).id+"/4",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        let respostasFiltradas = groupBy(data.response.progress, 'categoria'),
            totalMat = 0,
            totalIng = 0,
            totalPor = 0
        Object.keys(respostasFiltradas).forEach((resposta, index) => {
            console.log(resposta, respostasFiltradas[resposta].peso)
            respostasFiltradas[resposta].forEach(answer => {
                console.log(answer)
                if (answer.categoria == "Matemática") {
                    totalMat += answer.peso
                } else if (answer.categoria == "Inglês") {
                    totalIng += answer.peso
                } else if (answer.categoria == "Português") {
                    totalPor += answer.peso
                }
            });
            console.log(totalIng)
            console.log(totalMat)
            console.log(totalPor)
        });
        var options = {
            series: [totalMat, totalIng, totalPor],
            labels: ['Javascript', 'Inglês', 'Cultura'],
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
        let largest,
            category
        if (totalMat >= totalIng && totalMat >= totalPor) {
            largest = totalMat;
            category = "JavaScript"
        }
        else if (totalIng >= totalMat && totalIng >= totalPor) {
            largest = totalIng;
            category = "Inglês"
        }
        else {
            largest = totalPor;
            category = "Cultura"
        }
        if(totalMat+totalIng+totalPor >= 30){
            $('.result-area-success').append(`
            <p class="message resultMessage">
            Seu resultado em <span class="text-yellow">${category}</span>, foi <span class="text-green">muito bom!</span>
            </p>
            <p class="message contentMessage">
                Se prepare para os próximos desafios com conteúdos gratuitos da <span class="text-yellow">EY university</span>, para ver mais <a href="extrato.html"
                class="text-yellow">clique aqui</a>.
            </p>
            <p class="message dateMessage">
                Complete esta jornada até o dia <span class="text-yellow">14/10/2022</span> para ter acesso a mais jornadas
            </p>
            <a href="questionario_dev.html" class="inputButton inoutButton eyButton large">Continuar para proxima fase</a>
            `)
        }else{
            $('.result-area-success').append(`
            <p class="message resultMessage">
            Seu resultado em <span class="text-yellow">Jornada Pessoa desenvolvedora</span>, <span class="text-red">não atingiu a nota minima</span> de <span class="text-red">30</span> pontos
            </p>
            <p class="message contentMessage">
                Se prepare melhor para este desafio com conteúdos gratuitos da <span class="text-yellow">EY university</span>, para ver mais <a href="extrato.html"
                class="text-yellow">clique aqui</a>.
            </p>
            <p class="message dateMessage">
                Complete esta jornada até o dia <span class="text-yellow">14/10/2022</span> para ter acesso a mais jornadas
            </p>
            <a href="questionario_dev.html" class="inputButton inoutButton eyButton large">Tentar novamente</a>
            `)
        }

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });
}
loadResults2()
function loadResults2() {
    var settings = {
        "url": "https://rest-api-ey.herokuapp.com/candidatos/progress/"+JSON.parse(localStorage.getItem('user')).id+"/14",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        let respostasFiltradas = groupBy(data.response.progress, 'categoria'),
            totalMat = 0,
            totalIng = 0,
            totalPor = 0
        Object.keys(respostasFiltradas).forEach((resposta, index) => {
            console.log(resposta, respostasFiltradas[resposta].peso)
            respostasFiltradas[resposta].forEach(answer => {
                console.log(answer)
                if (answer.categoria == "Matemática") {
                    totalMat += answer.peso
                } else if (answer.categoria == "Inglês") {
                    totalIng += answer.peso
                } else if (answer.categoria == "Português") {
                    totalPor += answer.peso
                }
            });
            console.log(totalIng)
            console.log(totalMat)
            console.log(totalPor)
        });
        var options = {
            series: [totalMat, totalIng, totalPor],
            labels: ['Scrum', 'Inglês', 'Cultura'],
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
        let largest,
            category
        if (totalMat >= totalIng && totalMat >= totalPor) {
            largest = totalMat;
            category = "Scrum"
        }
        else if (totalIng >= totalMat && totalIng >= totalPor) {
            largest = totalIng;
            category = "Inglês"
        }
        else {
            largest = totalPor;
            category = "Cultura"
        }
        if(totalMat+totalIng+totalPor >= 30){
            $('.result-area-fail').append(`
            <p class="message resultMessage">
            Seu resultado em <span class="text-yellow">${category}</span>, foi <span class="text-green">muito bom!</span>
            </p>
            <p class="message contentMessage">
                Se prepare para os próximos desafios com conteúdos gratuitos da <span class="text-yellow">EY university</span>, para ver mais <a href="extrato.html"
                class="text-yellow">clique aqui</a>.
            </p>
            <p class="message dateMessage">
                Complete esta jornada até o dia <span class="text-yellow">14/10/2022</span> para ter acesso a mais jornadas
            </p>
            <a href="questionario_dev.html" class="inputButton inoutButton eyButton large">Continuar para proxima fase</a>
            `)
        }else{
            $('.result-area-fail').append(`
            <p class="message resultMessage">
            Seu resultado em <span class="text-yellow">Jornada Agilista</span>, <span class="text-red">não atingiu a nota minima</span> de <span class="text-red">30</span> pontos
            </p>
            <p class="message contentMessage">
                Se prepare melhor para este desafio com conteúdos gratuitos da <span class="text-yellow">EY university</span>, para ver mais <a href="extrato.html"
                class="text-yellow">clique aqui</a>.
            </p>
            <p class="message dateMessage">
                Complete esta jornada até o dia <span class="text-yellow">14/10/2022</span> para ter acesso a mais jornadas
            </p>
            <a href="questionario_dev.html" class="inputButton inoutButton eyButton large">Tentar novamente</a>
            `)
        }

        var chart = new ApexCharts(document.querySelector("#chart2"), options);
        chart.render();
    });
}