const Snake = {
    position: { x: 0, y: Math.floor(ROWS / 2) },
    velocity: { x: 1, y: 0 },
    length: 2,
    score: 0,
    segments: [],

    draw(ctx) {
        this.segments.forEach((segment, i) => {
            if (i === 0) {
                ctx.fillStyle = "gold";
            } else {
                ctx.fillStyle = "magenta";
            }
            ctx.fillRect(
                segment.x * CELL_SIZE,
                segment.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        });
        ctx.textAlign = "left";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.score, 20, 20);
    },

    reset() {
        this.position = { x: 0, y: Math.floor(ROWS / 2) };
        this.velocity = { x: 1, y: 0 };
        this.length = 2;
        this.score = 0;
        this.segments = [];
    },

    update() {
        // move the snake
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // add/remove segments
        this.segments.unshift({ x: this.position.x, y: this.position.y });
        if (this.segments.length > this.length) {
            this.segments.pop();
        }

        // check for collision with walls
        if (
            this.position.x < 0 ||
            this.position.x >= COLUMNS ||
            this.position.y < 0 ||
            this.position.y >= ROWS
        ) {
            GAME.gameOver = true;
        }

        // eat food
        if (this.position.x === Food.x && this.position.y === Food.y) {
            Food.reset();
            this.length++;
            this.score++;
        }

        // eat tail
        this.segments.forEach((segment, i) => {
            if (
                i !== 0 &&
                this.position.x === segment.x &&
                this.position.y === segment.y
            ) {
                this.segments.length = i + 1;
                this.length = this.segments.length;
                this.score -= 5;
            }
        });
    },

    moveUp() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = -1;
        }
    },

    moveDown() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = 1;
        }
    },

    moveLeft() {
        if (this.velocity.x === 0) {
            this.velocity.x = -1;
            this.velocity.y = 0;
        }
    },

    moveRight() {
        if (this.velocity.x === 0) {
            this.velocity.x = 1;
            this.velocity.y = 0;
        }
    },
};
