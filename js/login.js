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

function login(email, password) {
    var settings = {
        "url": "localhost:3000/usuarios/login/"+email+"/"+password,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.usuario.length >= 0) {
            localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
            location.href = "http://127.0.0.1:5500/html/home.html"
        }
    });


}
$('#loginBtn').on('click', function () {
    validateFields($(`#inputEmail`).val(), $(`#inputPassword`).val())
})

function validateFields(email, password) {
    (validateEmail(email) && $('#inputPassword').val() != '') ? login(email, password) : $('#inputPassword').addClass('error')
}
