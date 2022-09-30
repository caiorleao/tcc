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

var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

$("#inputCPF").mask('000.000.000-00', { reverse: true });
$("#inputCEP").mask('00000-000');
$("#inputBirthday").mask('00/00/0000');
$('#inputCellphone').mask(SPMaskBehavior, spOptions);

let emailValid = false,
    cpfValid = false,
    passwordValid = false


function validateEmail(email) {
    if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $("#inputFirstName").hasClass('error') ? $("#inputFirstName").removeClass('error') : ''
        emailValid = true
    } else {
        emailValid = false
    }
    return emailValid
}

function validatePassword(password, confirm) {
    let re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    if (!re.test(password) || password != confirm) {
        $(`.errorPassword`).addClass('show')
        $(`#inputPassword`).addClass('error')
        passwordValid = false
    } else {
        $(`.errorPassword`).removeClass('show')
        $(`#inputPassword`).removeClass('error')
        passwordValid = true
    }
    return passwordValid
}

let banks = []


$("#createUser").on("click", function () {
    isValid() ? registerUser() : ''
})

$("#addBankAccount").on("click", function () {
    if ($("#inputToken").val() != '') {
        validateBank($("#inputToken").val())
    } else {
        $(`.errorToken`).addClass('show')
        $(`#inputToken`).addClass('error')
    }
})

function validateBank(token) {
    JsLoadingOverlay.show(configs);
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/contas/pesquisar/" + token,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.length >= 0) {
            banks.push(data.response[0])
            $(".addBanks").append(`<p class="banks">${data.response[0].banco} - ${data.response[0].token}</p>`)
            $("#inputToken").val('')
            $(`.errorToken`).removeClass('show')
            $(`#inputToken`).removeClass('error')
            console.log('teste', banks)
            localStorage.setItem('banks', JSON.stringify(banks))
        } else {
            $(`.errorToken`).addClass('show')
            $(`#inputToken`).addClass('error')
            console.log('error')
        }
        JsLoadingOverlay.hide();
    });
}


function isValid() {
    if (!isEmpty()) {
        if (validatePassword($('#inputPassword').val(), $('#inputPasswordConfirm').val())) {
            if (validateCPF($('#inputCPF').val()) && validateEmail($('#inputEmail').val()) && banks.length >= 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        return false;
    }
}

function registerUser() {
    let user = {
        "cpf": $('#inputCPF').val(),
        "nome": $('#inputFirstName').val(),
        "sobrenome": $('#inputLastName').val(),
        "email": $('#inputEmail').val(),
        "telefone": $('#inputCellphone').val(),
        "dtnascimento": $('#inputBirthday').val(),
        "senha": $('#inputPassword').val(),
        "cep": $('#inputCEP').val(),
        "logradouro": $('#inputStreet').val(),
        "numero": $('#inputNumber').val(),
        "complemento": $('#inputComplemento').val(),
        "cidade": $('#inputCidade').val(),
        "uf": $('#inputState').val()
    }
    postUser(user)
}

function isEmpty() {
    let isEmpty = false
    $('.inputField-cadastro').each(function (index, field) {
        if ($(field).val() == "" && $(field).attr('id') != 'inputToken') {
            $(`.error${$(field).attr('id').replace("input", "")}`).addClass('show')
            $(`#${$(field).attr('id')}`).addClass('error')
            isEmpty = true
        } else {
            $(`.error${$(field).attr('id').replace("input", "")}`).removeClass('show')
            $(`#${$(field).attr('id')}`).removeClass('error')
        }
    });
    return isEmpty
}


function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });

    if (!result) {
        $(`.errorCPF`).addClass('show')
        $(`#inputCPF`).addClass('error')
    } else {
        $(`.errorToken`).removeClass('show')
        $(`#inputToken`).removeClass('error')
    }
    cpfValid = result
    return cpfValid;
}

function postUser(user) {
    JsLoadingOverlay.show(configs);
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/usuarios/cadastro",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(user),
    };

    $.ajax(settings).done(function (data) {
        if (data.response.mensagem = "Usuário cadastrado com sucesso!!") {
            login(user.email, user.senha)
        }
    });
}

function login(email, senha) {
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/usuarios/login/ronaldo@gmail.com/R1234",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.usuario.length >= 0) {
            let banks = JSON.parse(localStorage.getItem('banks'))
            localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
            banks.forEach(bank => {
                linkBank(bank.idconta, data.response.usuario[0].id)
            });
            location.href = "http://127.0.0.1:5500/html/perfil_investidor.html"
        }
    });

}

function linkBank() {
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/contas/alterar/1/1",
        "method": "PATCH",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        JsLoadingOverlay.hide();
        console.log(data.message)
    });
}