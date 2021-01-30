class Ball {
    constructor() {
        this.rad = 10;
        this.x = canvas.width / 2 - this.rad / 2;
        this.y = canvas.height - 100 - this.rad;

        this.color = randColor();
        this.vy = 1;
        this.vx = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        ctx.fill();
    }

    update() {
        if (this.y + this.rad > canvas.height - 100) {
            this.vy = 0;
            this.y = canvas.height - 100 - this.rad;
        }

        if (this.x - this.rad < 0 || this.x + this.rad > canvas.width) {
            this.vx = -this.vx;
        }

        this.x += this.vx;
        this.vx = this.vx > 0 ? this.vx - 0.1 : this.vx + 0.1;

        this.y += this.vy;
        this.vy++;

        this.draw();
    }
    jump(dirn) {
        if (dirn === "left") {
            this.vx = -4;
        } else if (dirn === "right") {
            this.vx = 4;
        }

        this.y -= 2;
        this.vy = -12;
    }
}

let ball = new Ball();
