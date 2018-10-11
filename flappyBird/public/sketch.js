let bird;
let pipes = [];
let score = 0;
var s1;
var bg;
var topPipe;
var bottomPipe;
let scoreDiv;
let enterDiv;
let died = false;

function preload() {
    s1 = loadImage('../images/bird.gif');
    bg = loadImage('../images/background.png');
    topPipe = loadImage('../images/top.png');
    bottomPipe = loadImage('../images/bottom.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(bg);
    bird = new Bird();
    pipes.push(new Pipe());
    scoreDiv = createDiv(score);
    scoreDiv.id("score");
    scoreDiv.position(width / 2, 30);
    enterDiv = createDiv("Press ENTER to play again!");
    enterDiv.hide();
    enterDiv.id("enterDiv");
    enterDiv.position(width / 2, 90);
}

function draw() {
    background(bg);

    for (let index = 0; index < pipes.length; index++) {
        pipes[index].show();
        if (!died) {
            pipes[index].update();
        }

        if (pipes[index].hits(bird)) {
            died = true;
        }
        if (!died) {
            if (pipes[index].x + pipes[index].width <= bird.x) {
                pipes.splice(index, 1);
                score++;
            }
        }

    }

    bird.show();
    if (!died) {
        bird.update();
    }

    if (frameCount % 70 === 0) {
        pipes.push(new Pipe());
    }
    let text = score.toString();
    if (died) {
        text = "Your score is " + score + "!";
    }
    document.getElementById("score").textContent = text;
    if (died){
        $('#enterDiv').show();
    }
}

function keyPressed() {
    if (keyCode === 32) {
        bird.up();
    }
    if (keyCode === 13) {
        died = false;
        score = 0;
        $('#enterDiv').hide();
        pipes.length = 0;
    }
}