
//Load perguntas e respostas START
function loadQA() {
    var settings = {
        "url": "https://rest-api-ey.herokuapp.com/jornadas/carregar/4",
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (data) {
        if (data.response) {
            let perguntas = data.response.informacoes,
                perguntasFiltradas = groupBy(perguntas, 'pergunta'),
                listaQA = []
            Object.keys(perguntasFiltradas).forEach((pergunta, index) => {
                let listaRespostas = []
                
                listaQA = []

                console.log(pergunta, perguntasFiltradas[pergunta])
                perguntasFiltradas[pergunta].forEach((resposta, index) => {
                    listaRespostas.push(`
                    <label class="radio">
                        <input class="asnwer" data-pergunta-id="${resposta.id_pergunta}" data-peso="${resposta.peso}" data-resposta-id="${resposta.id_resposta}" type="radio" value="${resposta.peso}">
                        <span class="answerText">${resposta.resposta}</span>
                    </label>`)
                    console.log('respostaaaaa', resposta)
                    console.log(listaRespostas)
                })
                listaQA.push(`
                <div class="questions">
                    <p class="questionTitle">${index + 1}. ${pergunta}
                    ${listaRespostas}
                    </p>
                </div>`)
            });
            $('.journeyCards').append(`
            <div class="contentCard contentCard-fullsize journeyCard manualInout" id="step1">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">Pessoa programadora | Front-end</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            ${listaQA}
                            <button class="inputButton inoutButton eyButton" id="continue1">continuar</button>
                            <button class="inputButton inoutButton eyButton goback" id="goBack1">Voltar</button>
                        </div>
                        <div class="half-form">
                            <div class="profileImage">
                                <img src="../../img/DrawKit Vector Illustration Team Work (2).svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)

        }
    });
}
loadQA()
//Load perguntas e respostas END
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


//Audio START
let audioCount = 0
function play() {
    var audio = document.getElementById('audio');
    if (audio.paused && audioCount <= 2) {
        audio.play()
        audioCount++
        $('.audioCount').text(3 - audioCount)
    } else {
        console.log('aguarde')
    }
}

$("#playButton").on('click', function () {
    play()
})
//Audio END

//Change Step START
$('#continue1').on('click', function () {
    $('#step1').addClass('hide')
    $('#step2').removeClass('hide')
})
$('#continue2').on('click', function () {
    $('#step2').addClass('hide')
    $('#step3').removeClass('hide')
})
$('#continue3').on('click', function () {
    $('#step3').addClass('hide')
    $('#step4').removeClass('hide')
})
$('#continue4').on('click', function () {
    $('#step4').addClass('hide')
    $('#step5').removeClass('hide')
})
$('#continue5').on('click', function () {
    $('#step5').addClass('hide')
    $('#step6').removeClass('hide')
})
$('#continue6').on('click', function () {
    location.href = 'resultados.html'
})
$('#goBack1').on('click', function () {
    location.href = 'jornadas.html'
})
$('#goBack2').on('click', function () {
    $('#step2').addClass('hide')
    $('#step1').removeClass('hide')
})
$('#goBack3').on('click', function () {
    $('#step3').addClass('hide')
    $('#step2').removeClass('hide')
})
$('#goBack4').on('click', function () {
    $('#step4').addClass('hide')
    $('#step3').removeClass('hide')
})
$('#goBack5').on('click', function () {
    $('#step5').addClass('hide')
    $('#step4').removeClass('hide')
})
$('#goBack6').on('click', function () {
    $('#step6').addClass('hide')
    $('#step5').removeClass('hide')
})
//Change Step STOP



