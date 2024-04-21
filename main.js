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
    ctx.font = "30px Impact";
    ctx.textBaseline = "top";

    canvas.addEventListener("click", function () {
        if (GAME.gameOver) {
            resetGame();
            GAME.loop = setInterval(animate, 250);
        }
    });

    resetGame();

    function animate() {
        ctx.clearRect(0, 0, GAME.width, GAME.height);

        Food.draw(ctx);
        Snake.draw(ctx);

        Snake.update();

        if (GAME.gameOver) {
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "60px Impact";
            ctx.fillText(
                "GAME OVER!",
                GAME.width / 2,
                GAME.height / 2,
                GAME.width * 0.95
            );
            ctx.font = "30px Impact";
            ctx.fillText(
                "Click here to restart",
                GAME.width / 2,
                GAME.height / 2 + 60,
                GAME.width * 0.95
            );
            clearInterval(GAME.loop);
        }
    }

    GAME.loop = setInterval(animate, 250);
});
