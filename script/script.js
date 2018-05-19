window.onload = function () {
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    var z = 90;
    var x = 88;
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    ctx.font = "23px arial";
    var scene = new Image();
    scene.src = 'images/pista.png';
    var spriteSheet = new Image();
    spriteSheet.src = 'images/carro.png';
    var char = new Sprite(spriteSheet);
    var closeGate = new Image();
    closeGate.src = 'images/cancela_fechada.jpg';
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
    function keydownHandler(e) {
        switch (e.keyCode) {
            case left:
                char.moveLeft = true;
                char.moveUp = false;
                char.moveRight = false;
                char.moveDown = false;
                break;
            case up:
                char.moveLeft = false;
                char.moveUp = true;
                char.moveRight = false;
                char.moveDown = false;
                break;
            case right:
                char.moveLeft = false;
                char.moveUp = false;
                char.moveRight = true;
                char.moveDown = false;
                break;
            case down:
                char.moveLeft = false;
                char.moveUp = false;
                char.moveRight = false;
                char.moveDown = true;
                break;
            case z:
                char.stopSpeed = true;
                char.continueSpeed = false;
                break;
            case x:
                char.stopSpeed = false;
                char.continueSpeed = true;
                break;
        }
    }
    function keyupHandler(e) {
        switch (e.keyCode) {
            case right:
                char.moveRight = false;
                break;
            case left:
                char.moveLeft = false;
                break;
            case up:
                char.moveUp = false;
                break;
            case down:
                char.moveDown = false;
                break;
        }
    }
    spriteSheet.onload = function () {
        init();
    };
    var init = function () {
        loop();
    };
    var draw = function () {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.drawImage(scene, 0, 0, scene.width, scene.height, 0, 0, cnv.width, cnv.height);
        ctx.drawImage(closeGate, 0, 0, closeGate.width, closeGate.height, 440, 0, 173, 80);
        char.draw(ctx);
    };
    var update = function () {
        char.move(ctx);
    };
    var loop = function () {
        window.requestAnimationFrame(loop, cnv);
        draw();
        update();
    };
};
