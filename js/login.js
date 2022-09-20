const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const validatePassword = (password) => {
    let re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    return re.test(password)
}

const validate = () => {
    const email = $('#email').val();
    const password = $('#password').val();
    if (validateEmail(email)) {
        $('#email').addClass('success')
        if (validatePassword(password)) {
            login(email, password)
        }
    } else {
        $('#email').addClass('error')
    }
    return false;
}

const login = (email, password) => {
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
$('#loginBtn').on('click', validate);

