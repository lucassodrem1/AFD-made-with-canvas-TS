class Sprite {
    image: string;
    srcX: number = 0;
    srcY: number = 216;
    posX: number = 450;
    posY: number = 840;
    width: number = 72;
    height: number = 72;
    moveLeft: boolean = false;
    moveUp: boolean = false;
    moveRight: boolean = false;
    moveDown: boolean = false;
    stopSpeed: boolean = true;
    continueSpeed: boolean = false;
    speed: number = 0;
    speedCar: number = 0;
    detectedSpeed: number = 0;
    blinkOn: boolean = false;
    blinkCount: number = 100;
    tagVerification : boolean = false;
    welcome: boolean = false;
    thief: boolean = false;
    problem: boolean = false;

    constructor(img: string) {
        this.image = img;
    }

    draw = ctx => {
        ctx.drawImage(this.image, this.srcX, this.srcY, this.width, this.height,
                      this.posX, this.posY, this.width, this.height);
        
        ctx.fillStyle = "black";
        ctx.fillText(`Km/h: ${this.speedCar}`, 10, 60);
        ctx.fillText(`<- 30m`, 660, 270);
        ctx.fillText(`<- 50m`, 660, 570);
        this.speedCarAnimation();

        if(this.welcome) {
            ctx.fillText('Bem-vindo!', 10, 200);
            ctx.beginPath();
            ctx.arc(80, 500, 50, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(23,160,93, 1)";
            ctx.fill();
            ctx.stroke();

            //Muda a imagem para uma catraca aberta.
            const openGate = new Image();
            openGate.src = 'images/cancela_aberta.jpg';
            ctx.drawImage(openGate, 0, 0, openGate.width, openGate.height,
                          440, 0, 173, 80);
        }

        if(this.thief) {
            ctx.fillText('Caloteiro!', 10, 200);
            ctx.beginPath();
            ctx.arc(80, 700, 50, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(221,79,67, 1)";
            ctx.fill();
            ctx.stroke();
            alert('Você está preso!');
            location.href="index.html";
        }

        if(this.problem) {
            ctx.beginPath();
            ctx.arc(80, 600, 50, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,206,68, 1)";
            ctx.fill();
            ctx.stroke();
            this.stopSpeed = true;
            this.continueSpeed = false;
        }

        if(this.blinkOn && this.posY >= 300) {
            ctx.fillStyle = "red";
            ctx.fillText(`Km/h: ${this.speedCar}`, 10, 60);
        }
        
        ctx.beginPath();
        ctx.arc(80, 500, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(23,160,93, 0.1)";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(80, 600, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,206,68, 0.1)";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(80, 700, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(221,79,67, 0.1)";
        ctx.fill();
        ctx.stroke();

        // 9) Após ocorrer com sucesso os passos 5 ou 7, 2 5 segundos após a passagem do carro com
        // sucesso pela cancela, todos os painéis e letreiros são apagados, o sinal é apagado e a
        // cancela baixa. Assim, o fluxo é encerrado.
        //A página é recarregada.
        if(this.posY + this.height <= 0) {
            alert('Chegou ao destino!');
            location.href="index.html";
        }
    }

    move = ctx => {
        if(this.moveLeft) {
            this.posX -= this.speed;
            this.srcY = this.height * 1;
        }

        if(this.moveUp) {
            this.posY -= this.speed;
            this.srcY = this.height * 3;
        }

        if(this.moveRight) {
            this.posX += this.speed;
            this.srcY = this.height * 2;
        }

        //1) Ao chegar a 50 metros da cancela, o processo é iniciado. Neste caso, um sensor mede a
        //   velocidade do carro e a exibe para o cliente;
        if(this.posY <= 570 && this.posY >= 560) {
            this.detectedSpeed = this.speedCar;
        }

        //Grava a velocidade no canvas.
        if(this.posY <= 570 && this.posY >= 270) {
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillText(`Sensor: ${this.detectedSpeed}`, 10, 120);

            // 3) Caso a velocidade seja acima de 40 km/h, o painel que exibe a velocidade acende e apaga
            // (pisca) até o carro atingir 30 metros da cancela. 
            if(this.speedCar > 40) {
                ctx.fillText('Devagar, doido!', 10, 200);
                setInterval(() => {
                    this.blinkCount--;
                    if(this.blinkCount % 2 == 0) {
                        this.blinkOn = true;
                    } else {
                        // 2) Caso a velocidade seja de até 40 km/h, o painel que exibe a velocidade acende e permanece
                        //   assim até o carro atingir 30 metros da cancela.
                        this.blinkOn = false;
                    }
                }, 500);        
            }
        }

        // 4) Independente de ter se configurado a situação 2 ou a 3, ao atingir 30 metros da cancela, a
        // tag do cliente é lida;
        if (this.posY <= 270 && !this.tagVerification) {
            let res = prompt("Voc\u00ea est\u00e1 com sua TAG em dia?");
            if (res == 'sim') {
                // 7) Caso o cliente possua a TAG, porém haja algum problema na leitura da mesma, um sinal
                // amarelo acende, a cancela permanece fechada e um painel exibe a mensagem “Aguarde o
                // atendente”;
                //50% de chance da TAG estar com problema.
                let randomNumber = Math.round(Math.random());
                if (randomNumber == 1) {
                    this.problem = true;
                    alert('Sua TAG parece estar com problema, \naguarde alguns segundos pelo atendente...');
                    setTimeout(() => {
                        // 8) Caso o passo 7 ocorra, o sistema deve aguardar a liberação pelo atendente, quando então
                        // o sinal verde acende, a cancela abre e o painel exibe a mensagem “Cuidado da próxima
                        // vez!”;
                        alert('Problema resolvido!\n Cuidado da pr\u00f3xima vez!');
                        this.problem = false;
                        this.welcome = true;
                    }, 5000);
                } else {
                    // 5) Caso o cliente de fato possua a TAG e a mesma esteja em ordem, um sinal verde acende,
                    // a cancela abre e um painel exibe a mensagem “Boa viagem!”;
                    alert("Bem-vindo!");
                    this.welcome = true;
                }
            } else {
                // 6) Caso o cliente não possua a TAG, a cancela permanece fechada, um sinal vermelho acende
                // e um painel exibe a mensagem “Caloteiro!”. Neste cenário, o fluxo é encerrado
                this.thief = true;
            }

            this.tagVerification = true;
            
            //Parando o carro.
            this.moveUp = false;
            this.speedCar = 0;
            this.speed = 0;
        }
    }

    speedCarAnimation = () => {
        if((this.moveLeft || this.moveUp || this.moveRight) && this.continueSpeed) {
            this.speedCar++;
            if(this.speedCar % 10 == 0) {
                this.speed++;
            }
        }
    }
}