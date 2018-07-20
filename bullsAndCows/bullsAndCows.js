let movesCounter = (function () {
    let counter = 1;
    function restart() {
        counter = 1;
    }
    function count() {
        return counter++;
    }
    return {restart, count};
}());

$( "#yourNum" ).on( "keydown", function(event) {
    if(event.which == 13){
        calculateBullsAndCows();
    }
});

function generateNum(number) {
    let num = Math.floor(Math.random() * 8999) + 1000;
    $('#secretNum').val(num);
    $('#firstSection  h1').css("margin-right", "0");
    if (number === 1) {
        $('#start').css("display", "none");
        $('#new-game').css("display", "block");
        $('#oldMoves').text("");
    }
    else if (number === 2){
        $('#start').css("display", "block");
        $('#new-game').css("display", "none");
    }
    $('#play').prop("disabled", false);
    movesCounter.restart();
}

function calculateBullsAndCows() {
    let numberForGuess = $('#secretNum').val();
    let tryNum = Number($('#yourNum').val()).toString();

    if (tryNum === "NaN" || tryNum.length != 4 || tryNum[0] === "0"){
        $('#yourNum').val("");
        swal({
            title: "Error",
            text: "Невалиден вход",
            icon: "error",
        });
        return;
    }
    let isGuessVisted = [false, false, false, false];
    let isNumVisted = [false, false, false, false];

    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < numberForGuess.length; i++) {
        if (numberForGuess[i] === tryNum[i]){
            bulls++;
            isGuessVisted[i] = true;
            isNumVisted[i] = true;
        }
    }
    if (bulls === 4){
        win(tryNum);
        return;
    }
    for (let i = 0; i < numberForGuess.length; i++) {
        for (let j = 0; j < tryNum.length; j++) {
            if (i != j && !isNumVisted[j] && !isGuessVisted[i] && numberForGuess[i] === tryNum[j]){
                cows++;
                isGuessVisted[i] = true;
                isNumVisted[j] = true;
            }
        }
    }

    let moves = movesCounter.count();
    let text = `${moves}. ${tryNum} = ${bulls} бика и ${cows} крави\n`;
    $('#oldMoves').append(text);
    $('#yourNum').val("");
}
function surrender() {
    let num = $('#secretNum').val();
    swal({
        title: "Играй отново",
        text: `Числото, което трябваше да познаеш е ${num}!`,
        icon: "info",
    });
    $('#play').prop("disabled", true);
}
function win(tryNum) {
    swal({
        title: "Поздравления!",
        text: `Ти позна числото. Искаш ли да играеш отново?`,
        icon: "success",
    });
    $('#play').prop("disabled", true);
    let moves = movesCounter.count();
    let text = `${moves}. ${tryNum} = 4 бика и 0 крави\n`;
    $('#oldMoves').append(text);
}
function showRules() {
    swal({
        title: "Правила",
        text: "Целта на играта е да познаете кое число си е намислил компютъра. " +
        "Числото ще бъде в диапазона от 1000 до 9999.\nКогато получите \"крава\" " +
        "означава, че някоя от цифрите на вашето число се съдържа в числото на компютъра,\n" +
        "но не си е на мястото. Ако получите \"бик\", значи числото си е на мястото. " +
        "Целта е да получите 4 бика!",
        icon: "info",
    });
    $('#play').attr("disabled", "disabled");
}