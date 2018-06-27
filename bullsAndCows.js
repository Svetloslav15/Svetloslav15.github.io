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

function generateNum(number) {
    let num = Math.floor(Math.random() * 8998) + 1000;
    $('#secretNum').val(num);
    if (number === 1) {
        $('#start').css("display", "none");
        $('#surrender').css("display", "none");
        $('#win').css("display", "none");
        $('#new-game').css("display", "block");
        $('#oldMoves').text("");
    }
    else if (number === 2){
        $('#start').css("display", "block");
        $('#new-game').css("display", "none");
        $('#surrender').css("display", "none");
        $('#win').css("display", "none");
    }
    $("#bulls").val("0");
    $("#cows").val("0");
    $('#surrender').text("Числото, което трябваше да познаеш беше ");
    $('#play').removeAttr("disabled", "enable");
    $('#surrenderBtn').removeAttr("disabled", "enable");
    movesCounter.restart();
}


function calculateBullsAndCows() {
    let numberForGuess = $('#secretNum').val();
    let tryNum = Number($('#yourNum').val()).toString();

    if (tryNum === "NaN" || tryNum.length != 4){
        $('#oldMoves').append("Invalid input!\n");
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
        $('#win').css("display", "inline-block");
        $('#surrenderBtn').attr("disabled", "disabled");
        let moves = movesCounter.count();
        let text = `${moves}. ${tryNum} = ${bulls} бика и ${cows} крави\n`;
        $('#oldMoves').append(text);
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

    $('#bulls').val(bulls);
    $('#cows').val(cows);
    let moves = movesCounter.count();
    let text = `${moves}. ${tryNum} = ${bulls} бика и ${cows} крави\n`;
    $('#oldMoves').append(text);
}
function surrender() {
    let num = $('#secretNum').val();
    $('#surrender').append(num + "!");
    $('#surrender').css("display", "inline-block");
    $('#play').attr("disabled", "disabled");
    $('#surrenderBtn').attr("disabled", "disabled");
}