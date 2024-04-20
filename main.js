window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            Snake.moveUp();
            break;
        case "ArrowDown":
            Snake.moveDown();
            break;
        case "ArrowLeft":
            Snake.moveLeft();
            break;
        case "ArrowRight":
            Snake.moveRight();
            break;
    }
});

window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = GAME.width;
    canvas.height = GAME.height;

    function animate() {
        ctx.clearRect(0, 0, GAME.width, GAME.height);
        Snake.draw(ctx);
        Snake.update();
    }

    setInterval(animate, 250);
});
