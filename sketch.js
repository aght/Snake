var snake;
var food;

var grid = 10;
var score = 0;

var paused = false;
var gameIsOver = false;
var foodExists = false;

var allowDown = true; //Directional control variables. Prevents the game
var allowUp = true; //object from reversing directions.
var allowRight = true;
var allowLeft = false;

var counter = 0; //allows for flashing of lose screen
var FLASH_LIMIT = 4; //original number of flashes
var flashLimit = FLASH_LIMIT; //dynamic number of flashes
var flashDelay = 3; //delay between flashes, MUST be a whole number
var doneFlashing = false;

function setup() {
    var canvas = createCanvas(300, 300);
    canvas.parent('sketch');
    frameRate(10)
    snake = new Snake();
    food = new Food();
}

function draw() {
    background(51);
    fill(255);
    stroke(255);

    if (!gameIsOver) {
        snake.show(grid);
        food.createFood();
        snake.selfCollision();
        snake.update();
        snake.edgeCollision();
        snake.eatFood();

        drawScore();
        if (paused) {
            noStroke();
            textSize(32);
            fill(255);
            textAlign(CENTER);
            text("PAUSED", width / 2, height / 2);
        }
    } else {
        loseScreen();
        if (doneFlashing === false)
            counter++; //counter to allow for game over flashes to occur
    }
}

function drawScore() {
    noStroke();
    textSize(16);
    fill(255);
    textAlign(CENTER);
    text(score, grid * 3, grid * 3);
}

function loseScreen() {
    if (doneFlashing === false) {
        if ((counter % flashDelay === 0) && (flashLimit >= 0)) {
            noStroke()
            textSize(32);
            textAlign(CENTER);
            text("GAME OVER", width / 2, height / 2);
            flashLimit--;
            if (flashLimit === 0) {
                doneFlashing = true;
            }
        }

    } else {
        noStroke();
        textSize(32);
        textAlign(CENTER);
        text("GAME OVER", width / 2, height / 2);
    }

    noStroke();
    textSize(16);
    text(score, grid * 3, grid * 3);

    noStroke();
    textSize(15);
    text("Press 'Space' to try again", width / 2, height / 2 + 16);
}

function resetState() {
    snake.reset();
    food.pickLocation();
    score = 0;
    allowDown = true;
    allowUp = true;
    allowRight = true;
    allowLeft = false;
    counter = 0;
    doneFlashing = false;
    flashLimit = FLASH_LIMIT;
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (allowUp === true) {
            snake.setDir(0, -1);
            allowDown = false;
            allowLeft = true;
            allowRight = true;
        }
    }
    if (keyCode === DOWN_ARROW) {
        if (allowDown === true) {
            snake.setDir(0, 1);
            allowUp = false;
            allowLeft = true;
            allowRight = true;
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (allowLeft === true) {
            snake.setDir(-1, 0);
            allowRight = false;
            allowDown = true;
            allowUp = true;
        }
    }
    if (keyCode === RIGHT_ARROW) {
        if (allowRight === true) {
            snake.setDir(1, 0);
            allowLeft = false;
            allowDown = true;
            allowUp = true;
        }
    }
    if (keyCode === 32) {
        if (gameIsOver) {
            resetState();
        }
    }
    if (keyCode === 27) {

        if (!paused) {
            noLoop();
            paused = true;
        } else if (paused) {
            loop();
            paused = false;
        }
    }
}
