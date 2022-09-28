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

function validatePassword(password) {
    let re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    if (!re.test(password) || password !='') {
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

function login (email, password){
    switch (email) {
        case 'caio@gmail.com':
            sessionStorage.setItem('user', user1)
            console.log('logado')
        case 'felipe@gmail.com':
            sessionStorage.setItem('user', user1)
        case 'thais@gmail.com':
            sessionStorage.setItem('user', user1)
    }
    location.href = 'home.html'
}
$('#loginBtn').on('click', function () {
    validateFields($(`#inputPassword`).val(), $(`#inputEmail`).val())
})

function validateFields(password, email) {
    (validateEmail(email) && validatePassword(password)) ? login(email, password) : ''
}
