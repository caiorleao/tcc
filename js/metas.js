var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
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
$("#datepicker").mask('00/00/0000');

loadUserData(JSON.parse(localStorage.getItem('user')))

function loadUserData(userData) {
    JsLoadingOverlay.show(configs)
    if (localStorage.getItem('user') && localStorage.getItem('hasUpdated') != "true") {
        $(".user-name").text(JSON.parse(localStorage.getItem('user')).nome)
        loadAccounts(userData)
        loadGoals(userData)
    } else {
        var settings = {
            "url": "https://rest-api-startupone.herokuapp.com/usuarios/pesquisar/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            if (data.response.usuario.length >= 0) {
                localStorage.setItem('user', JSON.stringify(data.response.usuario[0]))
                $(".user-name").text(data.response.usuario[0].nome)
                loadAccounts(data.response.usuario[0])
                loadGoals(userData)
                localStorage.removeItem('hasUpdated')
            }
        });
    }
    JsLoadingOverlay.hide()
}

function loadAccounts(userData) {
    if (localStorage.getItem('accounts') && localStorage.getItem('hasUpdated') != "true") {
        let saldo = 0,
            accountTokens = []

        JSON.parse(localStorage.getItem('accounts')).response.forEach(account => {
            saldo += account.saldo
            accountTokens.push({ 'name': account.banco, 'token': account.token })
        });
        $(".accounts-total").text(PriceFormatter.format(localStorage.getItem('saldo')))    } else {
        var settings = {
            "url": "https://rest-api-startupone.herokuapp.com/contas/usuariocontas/" + userData.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            let saldo = 0,
                accountTokens = []
            localStorage.setItem('accounts', JSON.stringify(data))

            data.response.forEach(account => {
                saldo += account.saldo
                accountTokens.push({ 'name': account.banco, 'token': account.token })
            });
            $(".accounts-total").text(PriceFormatter.format(saldo))
            localStorage.setItem('saldo', saldo)

        });
    }
}


$('#addInOut').on('click', function () {
    if ($('#title').val() != '' && $('#value').val() != '' && $('#value').val() != '0' && $('#inicitialValue').val() != '' && $('#category').val() && $('#recorrencia').val()) {
        addGoal()
    } else {

    }
})

function loadGoals(user) {
    if (localStorage.getItem('goals') && localStorage.getItem('hasUpdated') != "true") {
        let porcentagem
        JSON.parse(localStorage.getItem('goals')).response.forEach(goal => {
            porcentagem = percentage(goal.vl_atual, goal.vl_total)
            $('.goals').append(`
              <div class="progressSection">
                  <div class="progress-info">
                      <div class="goalData">
                          <span class="goalTitle data text-yellow">${goal.titulo}</span>
                          <span class="goalCategory data text-blue-bright">${goal.categoria}</span>
                          <span class="goalDate data text-gray-secondary">${goal.recorrencia} - ${goal.dt_lancamento}</span>
                      </div>
                      <div class="goalValues">
                      <span class="goalCurrentValue text-gray-secondary">${goal.vl_atual < 0 ? PriceFormatter.format(0) : PriceFormatter.format(goal.vl_atual)}</span>
                      <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                          <span class="goalPercentage text-yellow">- ${goal.vl_atual < 0 ? 0 : Math.round(porcentagem)}%</span>
                      </div>
                  </div>
                  <div class="progress" id="${goal.titulo}">
                      <div class="progress-bar" role="progressbar" style="width: ${porcentagem}%"
                          aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              `)
        })
    } else {
        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/metas/carregar/" + user.id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (data) {
            let porcentagem
            localStorage.setItem('goals', data)
            data.response.forEach(goal => {
                porcentagem = percentage(goal.vl_atual, goal.vl_total)
                $('.goals').append(`
                  <div class="progressSection">
                      <div class="progress-info">
                          <div class="goalData">
                              <span class="goalTitle data text-yellow">${goal.titulo}</span>
                              <span class="goalCategory data text-blue-bright">${goal.categoria}</span>
                              <span class="goalDate data text-gray-secondary">${goal.recorrencia} - ${goal.dt_lancamento}</span>
                          </div>
                          <div class="goalValues">
                          <span class="goalCurrentValue text-gray-secondary">${goal.vl_atual < 0 ? PriceFormatter.format(0) : PriceFormatter.format(goal.vl_atual)}</span>
                          <span class="goalTotalValue text-yellow">/${PriceFormatter.format(goal.vl_total)}</span>
                              <span class="goalPercentage text-yellow">- ${goal.vl_atual < 0 ? 0 : Math.round(porcentagem)}%</span>
                          </div>
                      </div>
                      <div class="progress" id="${goal.titulo}">
                          <div class="progress-bar" role="progressbar" style="width: ${porcentagem}%"
                              aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                  </div>
                  `)
            })
        });
    }

}


function addGoal(user) {
    let goal = {
        "titulo": $('#title').val(),
        "categoria": $('#category').val(),
        "vl_total": $('#value').val(),
        "investimento_inicial": $('#inicitialValue').val(),
        "recorrencia": $('#recorrencia').val(),
        "dt_lancamento": $('#datepicker').val(),
        "vl_atual": $('#inicitialValue').val()
    }
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://rest-api-startupone.herokuapp.com/metas/cadastro/4",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(goal),
    };

    $.ajax(settings).done(function (response) {
        localStorage.setItem('hasUpdated', 'true')
        location.reload()
    });
}



$(document).on('input', '#value', function () {
    let value = $(this).val()
    value > 0 ? $('#valuePrice').removeClass('text-red').addClass('text-green') : $('#valuePrice').removeClass('text-green').addClass('text-red')
    $('#valuePrice').html('R$' + $(this).val() + ',00');
    $('#inicitialValue').attr('max', value)
    $('#inicitialValue').trigger('input')
});
$(document).on('input', '#inicitialValue', function () {
    let value = $(this).val()
    value > 0 ? $('#initialValuePrice').removeClass('text-red').addClass('text-green') : $('#initialValuePrice').removeClass('text-green').addClass('text-red')
    $('#initialValuePrice').html('R$' + $(this).val() + ',00');
});

var PriceFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});
function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

