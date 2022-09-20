const elem = document.querySelector('input[name="birthday"]');
const datepicker = new Datepicker(elem, {}); 

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

    if (validateEmail(email)) {
        $('#email').addClass('success')
        if (validatePassword(password)) {
            registration(email, password)
        }
    } else {
        $('#email').addClass('error')
    }
    return false;
}