const Snake = {
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 0 },
    length: 8,
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
    },

    moveUp() {
        this.velocity.x = 0;
        this.velocity.y = -1;
    },

    moveDown() {
        this.velocity.x = 0;
        this.velocity.y = 1;
    },

    moveLeft() {
        this.velocity.x = -1;
        this.velocity.y = 0;
    },

    moveRight() {
        this.velocity.x = 1;
        this.velocity.y = 0;
    },
};
