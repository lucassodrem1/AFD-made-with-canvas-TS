window.onload = () => {
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;
    const z = 90;
    const x = 88;

    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");
    ctx.font = "23px arial";

    const scene = new Image();
    scene.src = 'images/pista.png';
    
    const spriteSheet = new Image();
    spriteSheet.src = 'images/carro.png';
    const char = new Sprite(spriteSheet);

    const closeGate = new Image();
    closeGate.src = 'images/cancela_fechada.jpg';

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e) {
        switch(e.keyCode) {
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
		switch(e.keyCode) {
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

    spriteSheet.onload = () => {
        init();
    }

    const init = () => {
        loop();
    }

    const draw = () => {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        ctx.drawImage(scene, 0, 0, scene.width, scene.height,
                      0, 0, cnv.width, cnv.height);
        
        ctx.drawImage(closeGate, 0, 0, closeGate.width, closeGate.height,
                      440, 0, 173, 80);
        
        char.draw(ctx);
    }

    const update = () => {
        char.move(ctx);
    }

    const loop = () => {
        window.requestAnimationFrame(loop, cnv);
        draw();
        update();
    }
}