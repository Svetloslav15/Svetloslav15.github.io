const BASE_URL = 'https://hangman-61584.firebaseio.com';
var word = '';
let wrongMoves = 2;

function startGame() {
    if ($('#start').text() === "Старт" || $('#start').text() === "Започни нова игра") {
        $('#start').text("Предавам се");
        $('.letter').removeClass('already-selected');
        $('.letter').prop('disabled', false);
        $('#hangman').empty();
        wrongMoves = 2;
        $('#hangman').append(`<img src="imagesHangMan/1.PNG">`);
        generateWordMain();
    }
    else if ($('#start').text() === "Предавам се"){
        $('#start').text("Старт");
        gameOver();
        disableBtns();
    }
}

function updateInfo(symbol, id) {
    $(`#${id}`).prop("disabled", true);
    $(`#${id}`).addClass("already-selected");
    let resultContainer = $('h2');
    if (word.includes(symbol)) {
        let currentResult = "";
        let currentGuess = $(resultContainer).text().split(' ').join("");
        for (let index = 0; index < word.length; index++) {
            if (word[index] === symbol){
                currentResult += symbol;
            }
            else if (currentGuess[index] !== '_'){
                currentResult += word[index];
            }
            else {
                currentResult += ' _ ';
            }
        }
        if (!currentResult.includes('_')){
            winTheGame();
        }
        $(resultContainer).text(currentResult);
    }
    else {
        $('#hangman').empty();
        $('#hangman').append(`<img src="imagesHangMan/${wrongMoves}.PNG">`);
        wrongMoves++;
        if (wrongMoves === 9) {
            gameOver();
        }
    }
}

function generateWordMain() {
    var tempWord = "";
    let categoryInput = $('#category option:selected').text();
    let url = "";
    if (categoryInput === "Птици") {
        url = `${BASE_URL}/birds/-LHs4GLw7CU83CJuhNXu.json`
    }
    else if (categoryInput === "Столици") {
        url = `${BASE_URL}/capitals/-LHt0ZAtM3WvHV1Ku-Ib.json`
    }
    $.ajax({
        method: "GET",
        url: url,
        success: function (data) {
            let words = [];
            for (let key in data) {
                words.push(data[key]);
            }
            let index = generateRandomNum(0, 9);
            tempWord = words[index];
            word = words[index];
            $('h2').text('_ '.repeat(word.length));
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameOver() {
    swal({
        title: "Играй пак",
        text: `Думата, която трябваше да познаеш е ${word.toUpperCase()}`,
        icon: "error",
    });
    disableBtns();
    $('#start').text("Старт");
}

function winTheGame() {
    swal("Поздравления!", "Ти позна думата!", "success");
    $('#start').text("Започни нова игра");
    disableBtns();
}
function disableBtns() {
    $('.letter').prop('disabled', true);
}

function showRules() {
    swal({
        title: "Правила",
        text: "Целта на играта е да познаете думата," +
        " която си е намислил компютъра. Имате седем опита. " +
        "Можете да изберете категория от падащото меню долу. Приятна игра!",
        icon: "info"
    });
}

function postNewCategory() {
    $.ajax({
        method: "POST",
        url: `${BASE_URL}/capitals.json`,
        data: JSON.stringify(obj),
        success: ""
    });
}