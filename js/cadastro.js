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
        cpfValid = false
    } else {
        $(`.errorPassword`).removeClass('show')
        $(`#inputPassword`).removeClass('error')
        cpfValid = true
    }
    return cpfValid
}


let banks = []


$("#createUser").on("click", function () {
    isValid() ? registerUser() : ''
})

$("#addBankAccount").on("click", function () {
    if ($("#inputToken").val() != '') {
        banks.push({
            "name": $('#inputBank').find(":selected").val(),
            "account": $('#inputAccountType').find(":selected").val(),
            "token": $("#inputToken").val()
        })
        $(".addBanks").append(`<p class="banks">${$('#inputBank').find(":selected").val()} - ${$("#inputToken").val()}</p>`)
        $("#inputToken").val('')
        $(`.errorToken`).removeClass('show')
        $(`#inputToken`).removeClass('error')
    } else {
        $(`.errorToken`).addClass('show')
        $(`#inputToken`).addClass('error')
    }
})


function isValid() {
    if(!isEmpty()){
        if (validateCPF($('#inputCPF').val()) && validateEmail($('#inputEmail').val()) && validatePassword($('#inputPassword').text(), $('#inputPasswordConfirm').val()) && banks.lenght >= 0) {
            return true
        }else{
            return false
        }
    }else{
        return false;
    }   
}

function registerUser() {
    let user = {
        firstName: $('#inputFirstName').val(),
        password: $('#inputPassword').val(),
        lastName: $('#inputLastName').val(),
        email: $('#inputEmail').val(),
        cpf: $('#inputCPF').val(),
        birthday: $('#inputBirthday').val(),
        address: {
            line1: $('#inputEndereço').val(),
            line2: $('#inputComplemento').val(),
            city: $('#inputCity').val(),
            state: $('#inputState').val(),
            zipCode: $('#inputCEP')
        },
        accounts: {
            bank: $('#inputBank').val(),
            accountType: $('#inputAccountType').val(),
            token: $('#inputToken').val()
        }
    }
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


function validateCPF(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });

    if(!result){
        $(`.errorCPF`).addClass('show')
        $(`#inputCPF`).addClass('error')
    }else{
        $(`.errorToken`).removeClass('show')
        $(`#inputToken`).removeClass('error')
    }
    cpfValid = result
    return cpfValid;
}