
let selectedMeta
loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
    var settings = {
        "url": "localhost:3000/usuarios/pesquisar/" + userData.id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (data) {
        if (data.response.usuario.length >= 0) {
            localStorage.setItem('user', data.response.usuario)
            user = data.response.usuario[0]
            localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
            $(".user-name").text(user.nome)
            $("#name").text(user.nome)
            $('#id').text(user.id)
            $('#cpf').text(user.cpf)
            $('#investor').text(user.perfilinvestidor)
            $('#email').text(user.email)
            $('#date').text(user.dtnascimento)
            $('#cep').text(user.cep)
            $('#rua').text(user.logradouro)
            $('#number').text(user.numero)
            $('#complemento').text(user.complemento)
            $('#city').text(user.cidade)
            $('#state').text(user.uf)
            loadAccounts(user)
        }
    });
}
function loadAccounts() {
    $(".addBanks").append(`<p class="banks">${data.response[0].banco} - ${data.response[0].token}</p>`)
}