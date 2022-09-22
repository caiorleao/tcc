$('#continue1').on('click', function () {
    $('#step1').addClass('hide')
    $('#step2').removeClass('hide')
})
$('#continue2').on('click', function () {
    $('#step2').addClass('hide')
    $('#step3').removeClass('hide')
})
$('#continue3').on('click', function () {
    let numberArrayString = $.map($("input:radio.asnwer:checked"), function (elem, idx) {
        return "&" + $(elem).attr("name") + "=" + $(elem).val();
    });

    let total = 0
    let stringTotal = ''
    numberArrayString.forEach(function callback(number, index) {
        stringTotal += number.replace(/\D/g, "")
        total += parseInt(stringTotal[index])
        console.log('total por vez', total)
    });
    console.log('total', total)

    if (total == 9) {
        alert('Muito conservador')
    } else if (total > 9 && total <= 18) {
        alert('Conservador')
    } else if (total > 18 && total <= 27) {
        alert('Agressivo')
    } else if (total > 27 && total <= 36) {
        alert('Muito Agressivo')
    }
})
$('.inputButton').on('click', function () {
    let progressBar = $(this).attr('data-val')
    if (progressBar == '1') {
        $('.progressbar-1').addClass('half')
        $('.step-number.two').addClass('active')
    } else if (progressBar == '2') {
        $('.progressbar-2').addClass('half')
        $('.step-number.three').addClass('active')
    }
})