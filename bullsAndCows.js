function generateNum(number) {
    let num = Math.floor(Math.random() * 8998) + 1000;
    $('#secretNum').val(num);
    if (number === 1) {
        $('#start').css("display", "none");
        $('#surrender').css("display", "none");
        $('#win').css("display", "none");
        $('#new-game').css("display", "block");
    }
    else if (number === 2){
        $('#start').css("display", "block");
        $('#new-game').css("display", "none");
        $('#surrender').css("display", "none");
        $('#win').css("display", "none");
    }
}
let movesCounter = (function () {
    let counter = 1;
    return function () {
        return counter++;
    }
}());

function calculateBullsAndCows() {
    let numberForGuess = $('#secretNum').val();
    console.log(numberForGuess);
    let tryNum = Number($('#yourNum').val());
    let guessH = Math.floor(numberForGuess / 1000);
    let guessS = Math.floor(numberForGuess / 100 % 10);
    let guessD = Math.floor(numberForGuess / 10 % 10);
    let guessE = Math.floor(numberForGuess % 10);
    let numH = Math.floor(tryNum / 1000);
    let numS = Math.floor(tryNum / 100 % 10);
    let numD = Math.floor(tryNum / 10 % 10);
    let numE = Math.floor(tryNum % 10);

    let bulls = 0;
    let cows = 0;
    if (guessH === numH){
        bulls++;
    }
    if (guessS === numS){
        bulls++;
    }
    if (guessD === numD){
        bulls++;
    }
    if (guessE === numE){
        bulls++;
    }
    if (bulls === 4){
        $('#win').css("display", "inline-block");
        return;
    }
    let obj = {
        '0':0,
        '1':0,
        '2':0,
        '3':0,
        '4':0,
        '5':0,
        '6':0,
        '7':0,
        '8':0,
        '9':0
    };
    cows = obj[numH.toString()] + obj[numH.toString()] + obj[numH.toString()] + obj[numE.toString()];
    $('#bulls').val(bulls);
    $('#cows').val(cows);
    let moves = movesCounter();
    let text = `${moves}. ${tryNum} = ${bulls} бика и ${cows} крави\n`;
    $('#oldMoves').append(text);
}
