var Sprite = /** @class */ (function () {
    function Sprite(img) {
        var _this = this;
        this.srcX = 0;
        this.srcY = 216;
        this.posX = 450;
        this.posY = 840;
        this.width = 72;
        this.height = 72;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveRight = false;
        this.moveDown = false;
        this.stopSpeed = true;
        this.continueSpeed = false;
        this.speed = 0;
        this.speedCar = 0;
        this.detectedSpeed = 0;
        this.blinkOn = false;
        this.blinkCount = 100;
        this.tagVerification = false;
        this.welcome = false;
        this.thief = false;
        this.problem = false;
        this.draw = function (ctx) {
            ctx.drawImage(_this.image, _this.srcX, _this.srcY, _this.width, _this.height, _this.posX, _this.posY, _this.width, _this.height);
            ctx.fillStyle = "black";
            ctx.fillText("Km/h: " + _this.speedCar, 10, 60);
            ctx.fillText("<- 30m", 660, 270);
            ctx.fillText("<- 50m", 660, 570);
            _this.speedCarAnimation();
            if (_this.welcome) {
                ctx.fillText('Bem-vindo!', 10, 200);
                ctx.beginPath();
                ctx.arc(80, 500, 50, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(23,160,93, 1)";
                ctx.fill();
                ctx.stroke();
                //Muda a imagem para uma catraca aberta.
                var openGate = new Image();
                openGate.src = 'images/cancela_aberta.jpg';
                ctx.drawImage(openGate, 0, 0, openGate.width, openGate.height, 440, 0, 173, 80);
            }
            if (_this.thief) {
                ctx.fillText('Caloteiro!', 10, 200);
                ctx.beginPath();
                ctx.arc(80, 700, 50, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(221,79,67, 1)";
                ctx.fill();
                ctx.stroke();
                alert('Você está preso!');
                location.href = "index.html";
            }
            if (_this.problem) {
                ctx.beginPath();
                ctx.arc(80, 600, 50, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(255,206,68, 1)";
                ctx.fill();
                ctx.stroke();
                _this.stopSpeed = true;
                _this.continueSpeed = false;
            }
            if (_this.blinkOn && _this.posY >= 300) {
                ctx.fillStyle = "red";
                ctx.fillText("Km/h: " + _this.speedCar, 10, 60);
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
            if (_this.posY + _this.height <= 0) {
                alert('Chegou ao destino!');
                location.href = "index.html";
            }
        };
        this.move = function (ctx) {
            if (_this.moveLeft) {
                _this.posX -= _this.speed;
                _this.srcY = _this.height * 1;
            }
            if (_this.moveUp) {
                _this.posY -= _this.speed;
                _this.srcY = _this.height * 3;
            }
            if (_this.moveRight) {
                _this.posX += _this.speed;
                _this.srcY = _this.height * 2;
            }
            //1) Ao chegar a 50 metros da cancela, o processo é iniciado. Neste caso, um sensor mede a
            //   velocidade do carro e a exibe para o cliente;
            if (_this.posY <= 570 && _this.posY >= 560) {
                _this.detectedSpeed = _this.speedCar;
            }
            //Grava a velocidade no canvas.
            if (_this.posY <= 570 && _this.posY >= 270) {
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.fillText("Sensor: " + _this.detectedSpeed, 10, 120);
                // 3) Caso a velocidade seja acima de 40 km/h, o painel que exibe a velocidade acende e apaga
                // (pisca) até o carro atingir 30 metros da cancela. 
                if (_this.speedCar > 40) {
                    ctx.fillText('Devagar, doido!', 10, 200);
                    setInterval(function () {
                        _this.blinkCount--;
                        if (_this.blinkCount % 2 == 0) {
                            _this.blinkOn = true;
                        }
                        else {
                            // 2) Caso a velocidade seja de até 40 km/h, o painel que exibe a velocidade acende e permanece
                            //   assim até o carro atingir 30 metros da cancela.
                            _this.blinkOn = false;
                        }
                    }, 500);
                }
            }
            // 4) Independente de ter se configurado a situação 2 ou a 3, ao atingir 30 metros da cancela, a
            // tag do cliente é lida;
            if (_this.posY <= 270 && !_this.tagVerification) {
                var res = prompt("Voc\u00ea est\u00e1 com sua TAG em dia?");
                if (res == 'sim') {
                    // 7) Caso o cliente possua a TAG, porém haja algum problema na leitura da mesma, um sinal
                    // amarelo acende, a cancela permanece fechada e um painel exibe a mensagem “Aguarde o
                    // atendente”;
                    //50% de chance da TAG estar com problema.
                    var randomNumber = Math.round(Math.random());
                    if (randomNumber == 1) {
                        _this.problem = true;
                        alert('Sua TAG parece estar com problema, \naguarde alguns segundos pelo atendente...');
                        setTimeout(function () {
                            // 8) Caso o passo 7 ocorra, o sistema deve aguardar a liberação pelo atendente, quando então
                            // o sinal verde acende, a cancela abre e o painel exibe a mensagem “Cuidado da próxima
                            // vez!”;
                            alert('Problema resolvido!\n Cuidado da pr\u00f3xima vez!');
                            _this.problem = false;
                            _this.welcome = true;
                        }, 5000);
                    }
                    else {
                        // 5) Caso o cliente de fato possua a TAG e a mesma esteja em ordem, um sinal verde acende,
                        // a cancela abre e um painel exibe a mensagem “Boa viagem!”;
                        alert("Bem-vindo!");
                        _this.welcome = true;
                    }
                }
                else {
                    // 6) Caso o cliente não possua a TAG, a cancela permanece fechada, um sinal vermelho acende
                    // e um painel exibe a mensagem “Caloteiro!”. Neste cenário, o fluxo é encerrado
                    _this.thief = true;
                }
                _this.tagVerification = true;
                //Parando o carro.
                _this.moveUp = false;
                _this.speedCar = 0;
                _this.speed = 0;
            }
        };
        this.speedCarAnimation = function () {
            if ((_this.moveLeft || _this.moveUp || _this.moveRight) && _this.continueSpeed) {
                _this.speedCar++;
                if (_this.speedCar % 10 == 0) {
                    _this.speed++;
                }
            }
        };
        this.image = img;
    }
    return Sprite;
}());
