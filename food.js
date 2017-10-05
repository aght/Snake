function Food() {

    var x, y = 0;

    this.createFood = function () {
        if (foodExists === false) {
            this.pickLocation();
            foodExists = true;
        }

        push();
        fill(255, 0, 50);
        stroke(51);
        translate(x, y);
        rect(0, 0, grid, grid);
        pop();
    }

    this.pickLocation = function () {
        x = (Math.round(random((width - grid) / grid)) * grid);
        y = (Math.round(random((height - grid) / grid)) * grid);

        for (var i = 0; i < snake.getLength(); i++) {
            if (snake.getTailX(i) === x && snake.getTailY(i) === y) {
                this.pickLocation();
            }
        }
    }

    this.getFoodX = function () {
        return x;
    }

    this.getFoodY = function () {
        return y;
    }
}
