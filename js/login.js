let emailValid = false,
    passwordValid = false

function validateEmail(email) {
    if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        $("#inputEmail").hasClass('error') ? $("#inputEmail").removeClass('error') : ''
        $(`.errorEmail`).hasClass('show') ? $(`.errorEmail`).removeClass('show') : ''
        emailValid = true
    } else {
        $("#inputEmail").addClass('error')
        $(`.errorEmail`).addClass('show')
        emailValid = false
    }
    return emailValid
}

function login(email, senha) {
    var settings = {
        "url": "https://rest-api-ey.herokuapp.com/candidatos/login/" + email + "/" + senha,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.candidato.length >= 0) {
            location.href = "http://127.0.0.1:5500/html/AM/jornadas.html"
            localStorage.setItem('user', JSON.stringify(data.response.candidato[0]))
        }
    });

}
$('#loginBtn').on('click', function () {
    validateFields($(`#inputEmail`).val(), $(`#inputPassword`).val())
})

function validateFields(email, password) {
    (validateEmail(email) && $('#inputPassword').val() != '') ? login(email, password) : $('#inputPassword').addClass('error')
}
