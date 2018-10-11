let snake;
var scl = 20;
let food;
var speechRec;
function setup() {
    createCanvas(windowWidth, windowHeight);
    snake = new Snake(0, 0);
    frameRate(10);
    pickLocation();
    speechRec = new p5.SpeechRec('en-US', gotSpeech);
    speechRec.start(true, true);
}

function gotSpeech() {
    let direct = speechRec.resultString.split(' ');
    for (let direction of direct) {
        console.log(direction);
        if (direction === "up") {
            snake.direction(0, -1);
        }
        else if (direction === "down") {
            snake.direction(0, 1);
        }
        else if (direction === "right") {
            snake.direction(1, 0);
        }
        else if (direction === "left") {
            snake.direction(-1, 0);
        }
        else if (direction === "start"){
            snake.x = 0;
            snake.y = 0;
        }
    }
}
function draw() {
    background(51);
    snake.died();
    snake.update();

    fill(255, 0, 100);
    if (snake.eat(food)){
        pickLocation();
    }
    rect(food.x, food.y, scl, scl);
}
function pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}
function keyPressed() {
    if (keyCode === UP_ARROW){
        snake.direction(0, -1);
    }
    else if (keyCode === DOWN_ARROW){
        snake.direction(0, 1);
    }
    else if (keyCode === LEFT_ARROW){
        snake.direction(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW){
        snake.direction(1, 0);
    }
}