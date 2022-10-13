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
                perguntasFiltradas = groupBy(perguntas, 'categoria'),
                listaQA = [],
                listaResposta = []
            Object.keys(perguntasFiltradas).forEach((pergunta, index) => {
                console.log(pergunta, perguntasFiltradas[pergunta])
                console.log('aquiiiii', groupBy(perguntasFiltradas[pergunta], 'token_pergunta'))
                listaQA.push(groupBy(perguntasFiltradas[pergunta], 'token_pergunta'))
            });
            listaQA.forEach((resposta, index) => {
                console.log('resposta', resposta)
                listaResposta.push(resposta)
            })
            console.log('lista resposta', listaResposta)
            console.log(listaResposta[2].matematica1[0].titulo)
            let titleJornada = listaResposta[2].matematica1[0].titulo
            //append MAT START
            $('.journeyCards').append(`
            <div class="contentCard contentCard-fullsize journeyCard manualInout" id="step1">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">1.${listaResposta[2].matematica1[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q1" type="radio"
                                        value="${listaResposta[2].matematica1[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica1[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q1" type="radio"
                                        value="${listaResposta[2].matematica1[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica1[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q1" type="radio"
                                        value="${listaResposta[2].matematica1[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica1[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q1" type="radio"
                                        value="${listaResposta[2].matematica1[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica1[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">2.${listaResposta[2].matematica2[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q2" type="radio"
                                        value="${listaResposta[2].matematica2[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica2[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q2" type="radio"
                                        value="${listaResposta[2].matematica2[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica2[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q2" type="radio"
                                        value="${listaResposta[2].matematica2[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica2[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q2" type="radio"
                                        value="${listaResposta[2].matematica2[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica2[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">3.${listaResposta[2].matematica3[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q3" type="radio"
                                        value="${listaResposta[2].matematica3[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica3[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q3" type="radio"
                                        value="${listaResposta[2].matematica3[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica3[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q3" type="radio"
                                        value="${listaResposta[2].matematica3[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica3[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q3" type="radio"
                                        value="${listaResposta[2].matematica3[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica3[3].resposta}</span>
                                </label>
                            </div>
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack1">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue1">continuar</button>
                        </div>
                        <div class="half-form">
                        <div class="htmlExample">
                            var frutas = new Array("banana", "laranja", "limao");
                            <br>
                            frutas.shift();
                            <br>
                            frutas.splice(1, 1, "uva");
                            <br>
                            for(var i=0; i<frutas.length; i++)
                            <br>
                            document.write(frutas[i] + " | ");
                            <br>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentCard contentCard-fullsize journeyCard manualInout hide" id="step2">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">4.${listaResposta[2].matematica4[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q4" type="radio"
                                        value="${listaResposta[2].matematica4[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica4[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q4" type="radio"
                                        value="${listaResposta[2].matematica4[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica4[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q4" type="radio"
                                        value="${listaResposta[2].matematica4[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica4[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q4" type="radio"
                                        value="${listaResposta[2].matematica4[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica4[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">5.${listaResposta[2].matematica5[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q5" type="radio"
                                        value="${listaResposta[2].matematica5[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica5[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q5" type="radio"
                                        value="${listaResposta[2].matematica5[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica5[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q5" type="radio"
                                        value="${listaResposta[2].matematica5[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica5[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q5" type="radio"
                                        value="${listaResposta[2].matematica5[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica5[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">6.${listaResposta[2].matematica3[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q6" type="radio"
                                        value="${listaResposta[2].matematica6[0].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica6[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q6" type="radio"
                                        value="${listaResposta[2].matematica6[1].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica6[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q6" type="radio"
                                        value="${listaResposta[2].matematica6[2].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica6[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q6" type="radio"
                                        value="${listaResposta[2].matematica6[3].id_resposta}">
                                    <span class="answerText">${listaResposta[2].matematica6[3].resposta}</span>
                                </label>
                            </div>
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack2">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue2">continuar</button>
                        </div>
                        <div class="half-form">
                        <div class="htmlExample">
                        var str = "123456789";
                        <br>
                        var p = /[^5-7]/g;
                        <br>
                        var resultado = str.match(p);
                        </div>
                        </div>
                    </div>
                </div>
            </div>
             `)
            //append MAT END
            //append PORT START
            $('.journeyCards').append(`
            <div class="contentCard contentCard-fullsize journeyCard manualInout hide" id="step3">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">7.${listaResposta[1].portugues1[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q7" type="radio"
                                        value="${listaResposta[1].portugues1[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues1[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q7" type="radio"
                                        value="${listaResposta[1].portugues1[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues1[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q7" type="radio"
                                        value="${listaResposta[1].portugues1[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues1[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q7" type="radio"
                                        value="${listaResposta[1].portugues1[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues1[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">8.${listaResposta[1].portugues2[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q8" type="radio"
                                        value="${listaResposta[1].portugues2[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues2[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q8" type="radio"
                                        value="${listaResposta[1].portugues2[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues2[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q8" type="radio"
                                        value="${listaResposta[1].portugues2[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues2[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q8" type="radio"
                                        value="${listaResposta[1].portugues2[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues2[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">9.${listaResposta[1].portugues3[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q9" type="radio"
                                        value="${listaResposta[1].portugues3[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues3[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q9" type="radio"
                                        value="${listaResposta[1].portugues3[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues3[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q9" type="radio"
                                        value="${listaResposta[1].portugues3[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues3[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q9" type="radio"
                                        value="${listaResposta[1].portugues3[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues3[3].resposta}</span>
                                </label>
                            </div>
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack3">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue3">continuar</button>

                        </div>
                        <div class="half-form">
                            <div class="profileImage">
                                <img src="../../img/DrawKit Vector Illustration Team Work (3).svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentCard contentCard-fullsize journeyCard manualInout hide" id="step4">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">10.${listaResposta[1].portugues4[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q10" type="radio"
                                        value="${listaResposta[1].portugues4[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues4[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q10" type="radio"
                                        value="${listaResposta[1].portugues4[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues4[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q10" type="radio"
                                        value="${listaResposta[1].portugues4[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues4[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q10" type="radio"
                                        value="${listaResposta[1].portugues4[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues4[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">11.${listaResposta[1].portugues5[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q11" type="radio"
                                        value="${listaResposta[1].portugues5[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues5[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q11" type="radio"
                                        value="${listaResposta[1].portugues5[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues5[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q11" type="radio"
                                        value="${listaResposta[1].portugues5[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues5[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q11" type="radio"
                                        value="${listaResposta[1].portugues5[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues5[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">12.${listaResposta[1].portugues3[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q12" type="radio"
                                        value="${listaResposta[1].portugues6[0].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues6[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q12" type="radio"
                                        value="${listaResposta[1].portugues6[1].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues6[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q12" type="radio"
                                        value="${listaResposta[1].portugues6[2].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues6[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q12" type="radio"
                                        value="${listaResposta[1].portugues6[3].id_resposta}">
                                    <span class="answerText">${listaResposta[1].portugues6[3].resposta}</span>
                                </label>
                            </div>
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack4">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue4">continuar</button>
                        </div>
                        <div class="half-form">
                        <div class="profileImage">
                        <img src="../../img/DrawKit Vector Illustration Team Work (9).svg">
                    </div>
                        </div>
                    </div>
                </div>
            </div>
             `)
            //append PORT END
            //append ENG START
            $('.journeyCards').append(`
            <div class="contentCard contentCard-fullsize journeyCard manualInout hide" id="step5">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">13.${listaResposta[0].ingles1[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q13" type="radio"
                                        value="${listaResposta[0].ingles1[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles1[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q13" type="radio"
                                        value="${listaResposta[0].ingles1[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles1[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q13" type="radio"
                                        value="${listaResposta[0].ingles1[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles1[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q13" type="radio"
                                        value="${listaResposta[0].ingles1[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles1[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">14.${listaResposta[0].ingles2[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q14" type="radio"
                                        value="${listaResposta[0].ingles2[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles2[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q14" type="radio"
                                        value="${listaResposta[0].ingles2[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles2[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q14" type="radio"
                                        value="${listaResposta[0].ingles2[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles2[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q14" type="radio"
                                        value="${listaResposta[0].ingles2[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles2[3].resposta}</span>
                                </label>
                            </div>                            
                            <div class="questions">
                                <p class="questionTitle">15.${listaResposta[0].ingles3[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q15" type="radio"
                                        value="${listaResposta[0].ingles3[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles3[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q15" type="radio"
                                        value="${listaResposta[0].ingles3[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles3[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q15" type="radio"
                                        value="${listaResposta[0].ingles3[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles3[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q15" type="radio"
                                        value="${listaResposta[0].ingles3[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles3[3].resposta}</span>
                                </label>
                            </div>                            
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack5">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue5">continuar</button>

                        </div>
                        <div class="half-form">
                            <div class="audioImage">
                                <audio src="../../img/WhatsApp Audio 2022-10-12 at 12.52.56.mp4" id="audio1"></audio>
                                <img id="playButton1" src="../../img/3669295_ic_white_filled_play_circle_icon.svg">
                                <p>Você tem mais <span class="text-yellow audioCount audio1">3</span> chances de ouvir</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentCard contentCard-fullsize journeyCard manualInout hide" id="step6">
                <div class="contentCard-header">
                    <span class="cardHeader-title text-white">Jornada - <span
                            class="text-yellow">${titleJornada}</span></span>
                </div>
                <div class="contentCard-body">
                    <div class="inOutForm goalsForm text-white">
                        <div class="half-form first">
                            <div class="questions">
                                <p class="questionTitle">16.${listaResposta[0].ingles4[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q16" type="radio"
                                        value="${listaResposta[0].ingles4[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles4[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q16" type="radio"
                                        value="${listaResposta[0].ingles4[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles4[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q16" type="radio"
                                        value="${listaResposta[0].ingles4[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles4[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q16" type="radio"
                                        value="${listaResposta[0].ingles4[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles4[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">17.${listaResposta[0].ingles5[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q17" type="radio"
                                        value="${listaResposta[0].ingles5[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles5[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q17" type="radio"
                                        value="${listaResposta[0].ingles5[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles5[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q17" type="radio"
                                        value="${listaResposta[0].ingles5[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles5[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q17" type="radio"
                                        value="${listaResposta[0].ingles5[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles5[3].resposta}</span>
                                </label>
                            </div>
                            <div class="questions">
                                <p class="questionTitle">18.${listaResposta[0].ingles6[0].pergunta}
                                </p>
                                <label class="radio">
                                    <input class="answer" name="q18" type="radio"
                                        value="${listaResposta[0].ingles6[0].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles6[0].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q18" type="radio"
                                        value="${listaResposta[0].ingles6[1].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles6[1].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q18" type="radio"
                                        value="${listaResposta[0].ingles6[2].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles6[2].resposta}</span>
                                </label>
                                <label class="radio">
                                    <input class="answer" name="q18" type="radio"
                                        value="${listaResposta[0].ingles6[3].id_resposta}">
                                    <span class="answerText">${listaResposta[0].ingles6[3].resposta}</span>
                                </label>
                            </div>
                            <p class="eymessage errroInOut font-size-12">Selecione uma opção para cada pergunta</p>
                            <button class="inputButton inoutButton eyButton goback" id="goBack6">Voltar</button>
                            <button class="inputButton inoutButton eyButton " id="continue6">continuar</button>
                        </div>
                        <div class="half-form">
                        <div class="audioImage">
                            <audio src="../../img/WhatsApp Audio 2022-10-12 at 12.53.08.mp4" id="audio2"></audio>
                            <img id="playButton2" src="../../img/3669295_ic_white_filled_play_circle_icon.svg">
                            <p>Você tem mais <span class="text-yellow audioCount audio2">3</span> chances de ouvir</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
             `)
            //append ENG START
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
let audioCount1 = 0
let audioCount2 = 0
function play1() {
    var audio = document.getElementById('audio1');
    if (audio.paused && audioCount1 <= 2) {
        audio.play()
        audioCount1++
        $('.audio1').text(3 - audioCount1)
    } else {
        console.log('aguarde')
    }
}
function play2() {
    var audio = document.getElementById('audio2');
    if (audio.paused && audioCount2 <= 2) {
        audio.play()
        audioCount2++
        $('.audio2').text(3 - audioCount2)
    } else {
        console.log('aguarde')
    }
}

$(document).on('click', '#playButton1', function () {
    play1()
})
$(document).on('click', '#playButton2', function () {
    play2()
})
//Audio END

//Change Step START
$(document).on('click', '#continue1', function () {
    $('#step1').addClass('hide')
    $('#step2').removeClass('hide')
})
$(document).on('click', '#continue2', function () {
    $('#step2').addClass('hide')
    $('#step3').removeClass('hide')
})
$(document).on('click', '#continue3', function () {
    $('#step3').addClass('hide')
    $('#step4').removeClass('hide')
})
$(document).on('click', '#continue4', function () {
    $('#step4').addClass('hide')
    $('#step5').removeClass('hide')
})
$(document).on('click', '#continue5', function () {
    $('#step5').addClass('hide')
    $('#step6').removeClass('hide')
})
$(document).on('click', '#continue6', function () {
    let respondidas = []
    $(".answer:checked").each(function () {
        console.log($(this).attr('value'))
        respondidas.push($(this).attr('value'))
    });
    if (respondidas.length == 18) {
        $('.eymessage').removeClass('show')
        //Subir na API
        sendAnswers(respondidas)
    } else {
        $('.eymessage').addClass('show')
    }
})
$(document).on('click', '#goBack1', function () {
    location.href = 'jornadas.html'
})
$(document).on('click', '#goBack2', function () {
    $('#step2').addClass('hide')
    $('#step1').removeClass('hide')
})
$(document).on('click', '#goBack3', function () {
    $('#step3').addClass('hide')
    $('#step2').removeClass('hide')
})
$(document).on('click', '#goBack4', function () {
    $('#step4').addClass('hide')
    $('#step3').removeClass('hide')
})
$(document).on('click', '#goBack5', function () {
    $('#step5').addClass('hide')
    $('#step4').removeClass('hide')
})
$(document).on('click', '#goBack6', function () {
    $('#step6').addClass('hide')
    $('#step5').removeClass('hide')
})
//Change Step STOP


function sendAnswers(respostas) {
    var settings = {
        "url": `https://rest-api-ey.herokuapp.com/candidatos/respostas/4/${respostas[0]}/${respostas[1]}/${respostas[2]}/${respostas[3]}/${respostas[4]}/${respostas[5]}/${respostas[6]}/${respostas[7]}/${respostas[8]}/${respostas[9]}/${respostas[10]}/${respostas[11]}/${respostas[12]}/${respostas[13]}/${respostas[14]}/${respostas[15]}/${respostas[16]}/${respostas[17]}`,
        "method": "POST",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        location.href = 'resultados.html'
    });
}