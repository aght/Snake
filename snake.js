function Snake() {
    var x, y = 0; //Initial Snake cords
    var vx = 1; //Initial X Velocity
    var vy = 0; //Initial Y Velocity
    var sVec = createVector(x, y); //Cords of head of snake
    var length = 0;

    var tailX = []; //Tracks cords of snake tail: X Cords
    var tailY = []; //Tracks cords of snake tail: Y Cords

    this.show = function (size) {
        fill(255);
        rect(sVec.x, sVec.y, size, size);
        this.drawTail();
    }

    this.update = function () {
        tailX.push(sVec.x);
        tailY.push(sVec.y);
        fill(255);
        textSize(15);
        sVec.x += vx * grid;
        sVec.y += vy * grid;
    }

    this.setDir = function (nX, nY) {
        vx = nX;
        vy = nY;
    }

    this.drawTail = function () {
        fill(255);
        if (tailX.length > length) {
            tailX.shift();
            tailY.shift();
        }
        for (var i = 0; i < tailX.length; i++) {
            push();
            translate(tailX[i], tailY[i]);
            stroke(51)
            rect(0, 0, grid, grid);
            pop();
        }
    }

    this.selfCollision = function () {
        for (var i = 0; i < tailX.length; i++) {
            if (tailX[i] === sVec.x && tailY[i] === sVec.y) {
                gameIsOver = true;
            }
        }
    }

    this.edgeCollision = function () {
        if (sVec.x > width - grid ||
            sVec.x < 0 ||
            sVec.y > height - grid ||
            sVec.y < 0) {
            gameIsOver = true;
        }
    }

    this.eatFood = function () {
        if (sVec.x === food.getFoodX() && sVec.y === food.getFoodY()) {
            foodExists = false;
            score++;
            length++;
        }
    }

    this.reset = function () {
        sVec.x = 0;
        sVec.y = 0;
        vx = 1;
        vy = 0;
        length = 0;
        tailX = [];
        tailY = [];
        gameIsOver = false;
    }

    this.getLength = function () {
        return length;
    }

    this.getTailX = function (index) {
        return tailX[index];
    }

    this.getTailY = function (index) {
        return tailY[index];
    }

    this.getLocX = function () {
        return sVec.x;
    }

    this.getLocY = function () {
        return sVec.y;
    }

}
