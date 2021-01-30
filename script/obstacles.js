class Obstacle {
    constructor() {
        this.color = randColor();
        this.left = randInt(30, canvas.width / 2);
        this.right = canvas.width - this.left - 100;
        this.height = 20;
        this.y = -300;
        this.counted = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.y, this.left, this.height);
        ctx.fillRect(
            canvas.width - this.right,
            this.y,
            this.right,
            this.height
        );
    }

    update() {
        if (this.y > ball.y) {
            if (!this.counted) {
                score++;
                updateScore();
            }
            this.counted = true;
        }
        this.y += speed;
        this.draw();
    }
}

let obstacles = [];

function handleObstacles() {
    if (frame % 100 === 0) {
        obstacles.unshift(new Obstacle());
    }

    if (obstacles.length > 5) {
        obstacles.pop();
    }

    for (let obstacle of obstacles) {
        obstacle.update();
    }
}

function handleCollistion() {
    for (let obstacle of obstacles) {
        if (
            ball.y + ball.rad > obstacle.y &&
            ball.y - ball.rad < obstacle.y + obstacle.height &&
            ((ball.x - ball.rad > 0 && ball.x - ball.rad < obstacle.left) ||
                (ball.x + ball.rad < canvas.width &&
                    ball.x + ball.rad > canvas.width - obstacle.right))
        ) {
            return true;
        }
    }
}
