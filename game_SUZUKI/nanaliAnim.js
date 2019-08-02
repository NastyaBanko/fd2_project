let nanaliH = {
    posX: 0,
    posY: 0,
    speedX: 4,
    speedY: 2,
    width: 243,
    height: 426,
    update: function () {
        let nanaliImg = document.getElementById('nanali');
        nanaliImg.style.left = this.posX + "px";
        nanaliImg.style.top = this.posY + "px";
    }

};

let nanaliArea = {
    width: 1000,
    height: 600,
};


let suzukiH = {
    posX: 644,
    posY: 323,
    speedX: 4,
    speedY: 2,
    width: 356,
    height: 277,
    update: function () {
        let suzukiImg = document.getElementById('suzukiFly');
        suzukiImg.style.left = this.posX + "px";
        suzukiImg.style.top = this.posY + "px";
    }

};

let suzukiArea = {
    width: 1000,
    height: 600,
};

function tick() {
    nanaliH.posX += nanaliH.speedX;
    nanaliH.posY += nanaliH.speedY;
    if (nanaliH.posX + 1.45 * nanaliH.width > nanaliArea.width / 2) {
        nanaliH.speedX = -nanaliH.speedX;
        nanaliH.posX = nanaliArea.width / 2 - 1.45 * nanaliH.width;
        nanaliH.speedY = -nanaliH.speedY;
        nanaliH.posY = (nanaliArea.width / 2 - 1.45 * nanaliH.width) / 2;
    }
    if (nanaliH.posX < 0) {
        nanaliH.speedX = -nanaliH.speedX;
        nanaliH.posX = 0;
        nanaliH.speedY = -nanaliH.speedY;
        nanaliH.posY = 0;
    }

    suzukiH.posX += suzukiH.speedX;
    suzukiH.posY += suzukiH.speedY;
    if (suzukiH.posX + suzukiH.width > suzukiArea.width) {
        suzukiH.speedX = -suzukiH.speedX;
        suzukiH.posX = suzukiArea.width - suzukiH.width;
        suzukiH.speedY = -suzukiH.speedY;
        suzukiH.posY = (suzukiArea.width - suzukiH.width) / 2;
    }
    if (suzukiH.posX < suzukiArea.width / 2) {
        suzukiH.speedX = -suzukiH.speedX;
        suzukiH.posX = suzukiArea.width / 2;
        suzukiH.speedY = -suzukiH.speedY;
        suzukiH.posY = suzukiArea.width / 4;
    }

    nanaliH.update();
    suzukiH.update();
}

nanaliH.update();
suzukiH.update();
setInterval(tick, 40);