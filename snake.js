const Snake = {
    position: { x: 0, y: Math.floor(ROWS / 2) },
    velocity: { x: 1, y: 0 },
    length: 2,
    score: 0,
    segments: [],
    image: document.getElementById("snake_zilla"),
    spriteWidth: 200,
    spriteHeight: 200,

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

            this.setSpriteFrame(i);

            ctx.drawImage(
                this.image,
                segment.frameX * this.spriteWidth,
                segment.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
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
        this.segments.unshift({
            x: this.position.x,
            y: this.position.y,
            frameX: 2,
            frameY: 0,
        });
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

    setSpriteFrame(index) {
        const segment = this.segments[index];
        const nextSegment = this.segments[index + 1] || 0;
        const prevSegment = this.segments[index - 1] || 0;

        if (index === 0) {
            if (segment.y < nextSegment.y) {
                segment.frameX = 1;
                segment.frameY = 2;
            } else if (segment.y > nextSegment.y) {
                segment.frameX = 0;
                segment.frameY = 4;
            } else if (segment.x < nextSegment.x) {
                segment.frameX = 0;
                segment.frameY = 0;
            } else if (segment.x > nextSegment.x) {
                segment.frameX = 2;
                segment.frameY = 1;
            }
        } else if (index === this.segments.length - 1) {
            if (segment.y < prevSegment.y) {
                segment.frameX = 0;
                segment.frameY = 2;
            } else if (segment.y > prevSegment.y) {
                segment.frameX = 1;
                segment.frameY = 4;
            } else if (segment.x < prevSegment.x) {
                segment.frameX = 0;
                segment.frameY = 1;
            } else if (segment.x > prevSegment.x) {
                segment.frameX = 2;
                segment.frameY = 0;
            }
        } else {
            if (segment.y < nextSegment.y && segment.y > prevSegment.y) {
                // up
                segment.frameX = 1;
                segment.frameY = 3;
            } else if (segment.y > nextSegment.y && segment.y < prevSegment.y) {
                // down
                segment.frameX = 0;
                segment.frameY = 3;
            } else if (segment.x < nextSegment.x && segment.x > prevSegment.x) {
                // left
                segment.frameX = 1;
                segment.frameY = 0;
            } else if (segment.x > nextSegment.x && segment.x < prevSegment.x) {
                // right
                segment.frameX = 1;
                segment.frameY = 1;
            } else if (segment.y < nextSegment.y && segment.x > prevSegment.x) {
                // up left
                segment.frameX = 4;
                segment.frameY = 0;
            } else if (segment.y > nextSegment.y && segment.x > prevSegment.x) {
                // down left
                segment.frameX = 3;
                segment.frameY = 3;
            } else if (segment.y < nextSegment.y && segment.x < prevSegment.x) {
                // up right
                segment.frameX = 2;
                segment.frameY = 2;
            } else if (segment.y > nextSegment.y && segment.x < prevSegment.x) {
                // down right
                segment.frameX = 3;
                segment.frameY = 1;
            } else if (segment.x < nextSegment.x && segment.y > prevSegment.y) {
                // left up
                segment.frameX = 2;
                segment.frameY = 3;
            } else if (segment.x > nextSegment.x && segment.y > prevSegment.y) {
                // right up
                segment.frameX = 4;
                segment.frameY = 1;
            } else if (segment.x < nextSegment.x && segment.y < prevSegment.y) {
                // left down
                segment.frameX = 3;
                segment.frameY = 0;
            } else if (segment.x > nextSegment.x && segment.y < prevSegment.y) {
                // right down
                segment.frameX = 3;
                segment.frameY = 2;
            } else {
                segment.frameX = 6;
                segment.frameY = 0;
            }
        }
    },
};
