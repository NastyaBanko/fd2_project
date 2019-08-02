const canvasFon = document.getElementById('fon');//фон
let ctxFon = canvasFon.getContext('2d');
const canvasBlock = document.getElementById('blocks');//блочки для перемещения
let ctxBlock = canvasBlock.getContext('2d');
const canvas = document.getElementById('manField');//сузуки
let ctx = canvas.getContext('2d');
const canvasBullet = document.getElementById('bullet');
let ctxBullet = canvasBullet.getContext('2d');
const canvasMonster = document.getElementById('monster');
let ctxMonster = canvasMonster.getContext('2d');
const canvasLevel = document.getElementById('level');
let ctxLevel = canvasLevel.getContext('2d');
const canvasNumber = document.getElementById('number');
let ctxNumber = canvasNumber.getContext('2d');
const canvasCoins = document.getElementById('coins');
let ctxCoins = canvasCoins.getContext('2d');
const canvasArtifact = document.getElementById('artifact');
let ctxArtifact = canvasArtifact.getContext('2d');
const canvasMachine = document.getElementById('gunMachine');
let ctxMachine = canvasMachine.getContext('2d');
const canvasChildren = document.getElementById('children');
let ctxChildren = canvasChildren.getContext('2d');
let fon = new Image();
let icicles = new Image();
let spear = new Image();
let redMonster = new Image();
let greenMonster = new Image();
let heart = new Image();
let levelImg = new Image();
let coinImg = new Image();
let clover = new Image();
let book = new Image();
let fon2 = new Image();
let level2 = new Image();
let gunMachine = new Image();
let oneEye = new Image();
let bigMonster = new Image();
let slime = new Image();
let coin = new Image();
fon.src = 'person/part.png';
icicles.src = 'person/сосульки.png';
spear.src = 'person/копья2.png';
redMonster.src = 'person/firstMonsterSprite.png';
greenMonster.src = 'person/batman.png';
heart.src = 'person/heartNew.png';
levelImg.src = 'person/level1.png';
coinImg.src = 'person/money.png';
coin.src = 'person/coins.png';
clover.src = 'person/клевер.png';
book.src = 'person/books.png';
fon2.src = 'person/весна.png';
level2.src = 'person/level2.png';
gunMachine.src = 'person/gunMachine.png';
oneEye.src = 'person/oneEye.png';
bigMonster.src = 'person/bigMonster.png';
slime.src = 'person/slime.png';
let heartsCount = 3,
    coinCount = 0,
    scoreCount = 0,
    end = document.getElementById('end'),
    goodFinish = document.getElementById('goodFinish'),
    blackFon = document.getElementById('blackFon'),
    gameOver = document.getElementById('gameOver'),
    badFinish = document.getElementById('badFinish');
let audioShot = new Audio('http://noproblo.dayjo.org/GE/GE_US_AR33_Assault_Rifle.wav'),
    audioMonster = new Audio('http://www.wou.edu/~tbafarat06/1001%20Sound%20Effects/Horror%20Effects/Creature%20Growl%2006.wav'),
    audioMoney = new Audio('http://wohlsoft.ru/docs/Sounds/SMBX_OPL/SMBX_OPL_Sounds_src/WAV/dragon-coin.wav'),
    audioDeath = new Audio('http://starmen.net/mother2/soundfx/wound.wav');

let sec1 = 0,//секундомер
    timer1,
    sec2 = 0,
    timer2,
    nextClick = false,
    machineFight = false,
    slimeFight = false;
start.addEventListener('click', function () {
    function tickTimer() {
        sec1++;
    }

    timer1 = setInterval(tickTimer, 1000);
});

fon.onload = function () {//создание фона с помощью размножения маленького кусочка
    icicles.onload = function () {
        spear.onload = function () {
            heart.onload = function () {
                levelImg.onload = function () {
                    coinImg.onload = function () {

                        ctxFon.fillStyle = ctxFon.createPattern(fon, 'repeat');
                        ctxFon.fillRect(25, 25, canvasFon.width - 50, canvasFon.height - 50);
                        ctxFon.fillStyle = ctxFon.createPattern(icicles, 'repeat');
                        ctxFon.fillRect(0, 0, canvasFon.width, 74);
                        ctxFon.fillStyle = ctxFon.createPattern(spear, 'repeat');
                        ctxFon.fillRect(canvasFon.width - 240, canvasFon.height - 45, 120, 102);
                        ctxFon.fillRect(25, 420, 80, 40);

                        function createWorld(firstColor, secondColor, size, angle1, angle2) {
                            //создание маленького блочка, который можно будет использовать позже
                            ctxBlock.strokeStyle = firstColor;
                            ctxBlock.fillStyle = secondColor;
                            ctxBlock.lineWidth = 15;
                            ctxBlock.fillRect(0, 0, 25, 25);
                            ctxBlock.beginPath();
                            ctxBlock.moveTo(0, angle1);
                            ctxBlock.lineTo(size, angle2);
                            ctxBlock.stroke();
                            canvasBlock.style.display = 'none';

                            ctxFon.strokeStyle = ctxFon.createPattern(canvasBlock, 'repeat');//укрепление блочков в качестве паттернов
                            ctxFon.lineWidth = 50;
                            ctxFon.strokeRect(0, 0, canvasFon.width, canvasFon.height);//отрисовка рамки поля
                            ctxFon.fillStyle = ctxFon.createPattern(canvasBlock, 'repeat');
                        }

                        createWorld('#e6edf7', '#173b75', 25, 0, 25);

                        ctxLevel.fillStyle = '#0e3543';
                        ctxLevel.fillRect(0, 0, canvasLevel.width, canvasLevel.height);
                        ctxLevel.strokeStyle = ctxFon.createPattern(canvasBlock, 'repeat');
                        ctxLevel.lineWidth = 10;
                        ctxLevel.strokeRect(0, 0, canvasLevel.width, canvasLevel.height);
                        ctxLevel.drawImage(heart, canvasLevel.width / 2 - 75 / 2, 20);
                        ctxLevel.drawImage(levelImg, 0, canvasLevel.height - 367);
                        ctxLevel.drawImage(coinImg, canvasLevel.width / 2 - 47 / 2, canvasLevel.height - 367 - 57);
                        let score = 'score:';
                        ctxLevel.font = '20px Georgia';
                        ctxLevel.fillStyle = '#ff8f3a';
                        ctxLevel.fillText(score, 20, 119);

                        ctxNumber.font = '20px Georgia';
                        ctxNumber.fillStyle = '#ff8f3a';
                        ctxNumber.fillText(heartsCount, canvasLevel.width / 2 - 15 / 3, 59);
                        ctxNumber.fillText(coinCount, canvasNumber.width / 2 - 15 / 3, canvasNumber.height - 367 - 27);
                        ctxNumber.fillText(scoreCount, canvasNumber.width / 2 - 5, 159);

                        let blocks = [ //массив блоков с карты
                            {x: 25, y: 150, width: 80, height: 25},
                            {x: 25, y: 300, width: 80, height: 25},
                            {x: 25, y: 450, width: 80, height: 25},
                            {x: 250, y: 150, width: 428, height: 25},
                            {x: 250, y: 300, width: 428, height: 25},
                            {x: 250, y: 450, width: 428, height: 25},
                            {x: 823, y: 150, width: 80, height: 25},
                            {x: 823, y: 300, width: 80, height: 25},
                            {x: 823, y: 450, width: 80, height: 25},
                        ];
                        for (let i = 0; i < blocks.length; i++) {//отрисовка каждого блока
                            let block = blocks[i];
                            ctxFon.fillRect(block.x, canvas.height - block.y, block.width, block.height);
                        }

                        //МОНЕТЫ/////////////////////////////////////////////////////////////////////////
                        let coinsX1 = Math.floor(Math.random() * ((canvasCoins.width - 45) - 25) + 25);
                        let coinsX2 = Math.floor(Math.random() * ((canvasCoins.width - 45) - 25) + 25);
                        let coinsX3 = Math.floor(Math.random() * ((canvasCoins.width - 45) - 25) + 25);
                        let time1 = Math.floor(Math.random() * (13000 - 90000) + 90000);
                        let time2 = Math.floor(Math.random() * (13000 - 90000) + 90000);
                        let time3 = Math.floor(Math.random() * (13000 - 2000) + 2000);
                        let coorX = [coinsX1, coinsX2, coinsX3];
                        let coorY = [blocks[0].y - 2.5 * blocks[0].height, blocks[4].y - 2.5 * blocks[4].height, blocks[5].y - 2.5 * blocks[5].height];
                        let time = [time1, time2, time3];
                        let stayBlocks = [blocks[0].y, blocks[4].y, blocks[5].y];
                        let aboveStay = [-100, blocks[3].y, blocks[4].y];

                        let coinHash = {
                            x: Math.floor(Math.random() * ((canvasCoins.width - 45) - 25) + 25),
                            y: blocks[0].y - 2.5 * blocks[0].height,
                            time: 0,
                            block: 0,
                            above: 0,
                            width: 28,
                            height: 38,
                            sxC: 0,
                            tick_coins: 0,
                        };

                        let coins = [];

                        function addCoins() {
                            for (let i = 0; i < 3; i++) { // цикл чтобы добавить
                                coins.push(Object.create(coinHash)); // добавляем
                                coins[i].x = coorX[i]; // изменяем координаты x
                                coins[i].y = coorY[i]; // изменяем координаты y
                                coins[i].time = time[i];
                                coins[i].block = stayBlocks[i];
                                coins[i].above = aboveStay[i];
                            }
                        }

                        addCoins();

                        requestAnimationFrame(tickCoin);

                        function tickCoin() {
                            for (let i = 0; i < coins.length; i++) {
                                let coins_ = coins[i];
                                if (coins_.tick_coins > 10) {
                                    ctxCoins.clearRect(coins_.x, coins_.y, coins_.width, coins_.height);
                                    coins_.sxC = (coins_.sxC === 84 ? 0 : coins_.sxC + 28);
                                    ctxCoins.drawImage(coin, coins_.sxC, 0, coins_.width, coins_.height, coins_.x, coins_.y, coins_.width, coins_.height);
                                    coins_.tick_coins = 0;
                                    start.addEventListener('click', function () {
                                        setTimeout(function () {
                                            ctxCoins.clearRect(coins_.x, coins_.y, coins_.width, coins_.height);
                                            coins.splice(i, 1);
                                        }, coins_.time);
                                    });
                                }
                                coins_.tick_coins += 1;
                            }
                            requestAnimationFrame(tickCoin);
                        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//МОНСТРЫ
                        let redM1 = {
                            sxM: 0,
                            syM: 0,
                            tickCountM: 0,
                            x: blocks[4].x,
                            y: blocks[4].y - 139,
                            blockW: 428,
                            blockX: blocks[4].x,
                            blockY: blocks[4].y - 139,
                            width: 134,
                            height: 139,
                            speed: 2.4,
                            score: 100,
                            size: 402,
                            sizeOfOne: 134,
                        };

                        let greenM = {
                            sxM: 0,
                            tickCountM: 0,
                            x: blocks[5].x,
                            y: blocks[5].y - 125,
                            blockW: 428,
                            blockX: blocks[5].x,
                            blockY: blocks[5].y - 125,
                            width: 187,
                            height: 125,
                            speed: 3,
                            score: 100,
                            size: 561,
                            sizeOfOne: 187,
                        };

                        let monsters = [];
                        let monstersGreen = [];
                        let bigMonsterArr = [];
                        let slimeArr = [];
                        let children = [];
                        monsters.push(Object.create(redM1));
                        monstersGreen.push(Object.create(greenM));
                        requestAnimationFrame(tickMonsterRed);
                        requestAnimationFrame(tickMonsterGreen);

                        function tickMonsterRed() {
                            for (let i = 0; i < monsters.length; i++) {
                                let mArmy = monsters[i];
                                if (mArmy.tickCountM > 10) {
                                    ctxMonster.clearRect(mArmy.blockX, mArmy.blockY, 428, mArmy.height);
                                    mArmy.sxM = (mArmy.sxM === mArmy.size ? 0 : mArmy.sxM + mArmy.sizeOfOne);
                                    ctxMonster.drawImage(redMonster, mArmy.sxM, mArmy.syM, mArmy.width, mArmy.height, mArmy.x, mArmy.y, mArmy.width, mArmy.height);
                                    mArmy.tickCountM = 0;
                                }
                                mArmy.x += mArmy.speed;
                                if (mArmy.x > mArmy.blockX + mArmy.blockW - mArmy.width) {
                                    mArmy.syM = 139;
                                    mArmy.speed = -mArmy.speed;
                                    mArmy.x = mArmy.blockX + mArmy.blockW - mArmy.width;
                                }
                                if (mArmy.x < mArmy.blockX) {
                                    mArmy.syM = 0;
                                    mArmy.speed = -mArmy.speed;
                                    mArmy.x = mArmy.blockX;
                                }
                                mArmy.tickCountM += 1;
                            }
                            requestAnimationFrame(tickMonsterRed);
                        }

                        function tickMonsterGreen() {
                            for (let i = 0; i < monstersGreen.length; i++) {
                                let mArmy = monstersGreen[i];
                                if (mArmy.tickCountM > 10) {
                                    ctxMonster.clearRect(mArmy.blockX, mArmy.blockY, 428, mArmy.height);
                                    mArmy.sxM = (mArmy.sxM === mArmy.size ? 0 : mArmy.sxM + mArmy.sizeOfOne);
                                    ctxMonster.drawImage(greenMonster, mArmy.sxM, 0, mArmy.width, mArmy.height, mArmy.x, mArmy.y, mArmy.width, mArmy.height);
                                    mArmy.tickCountM = 0;
                                }
                                mArmy.x += mArmy.speed;
                                if (mArmy.x > mArmy.blockX + mArmy.blockW - mArmy.width) {
                                    mArmy.speed = -mArmy.speed;
                                    mArmy.x = mArmy.blockX + mArmy.blockW - mArmy.width;
                                }
                                if (mArmy.x < mArmy.blockX) {
                                    mArmy.speed = -mArmy.speed;
                                    mArmy.x = mArmy.blockX;
                                }
                                mArmy.tickCountM += 1;
                            }
                            requestAnimationFrame(tickMonsterGreen);
                        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        function suzuki() { //СУЗУКИ ЛУЧШЕ ВСЕХ
                            let staySuzukiLeft = new Image();
                            let staySuzukiRight = new Image();
                            let jumpSuzukiLeft = new Image();
                            let jumpSuzukiRight = new Image();
                            let sprite = new Image();
                            staySuzukiLeft.src = 'person/gunLeft.png';
                            staySuzukiRight.src = 'person/gunRight.png';
                            jumpSuzukiRight.src = 'person/jumpRight.png';
                            jumpSuzukiLeft.src = 'person/jumpLeft.png';
                            sprite.src = 'https://metanit.com/sharp/monogame/pics/scottpilgrim_multiple.png';

                            let tickCount = 0, //количество изображений
                                rightPressed = false, //определение нажатых кнопак, изначальное значение false, так как кнопки не нажаты
                                leftPressed = false,
                                dPressed = false,
                                manWidth = 105, //ширина, высота мальчика
                                manHeight = 130,
                                sx = 0,
                                dx = 50, //координаты
                                dy = 0,
                                jumpPressed = false,
                                jumpCount = 0,
                                jumpLength = 64,
                                inJump = false, //для проверки в прыжке ли
                                inFall = false, //для проверки падает ли
                                fallCount = 0,
                                fallSpeed = 0.2, //скорость падения
                                canJump = true, //для проверки может ли прыгнуть
                                currentBlock = null, //текущий блок(блок, на котором находится Сузуки)
                                speed = 4, //скорость бега
                                pointX = canvas.width - manWidth / 2 - 25, //конец канваса для Сузуки по горизонтали
                                pointY = canvas.height - manHeight - 15, //конец канваса для Сузуки по вертикали
                                facingRight = true, //используется ли правосмотрящий спрайт
                                countCrash = 0,
                                takeMoney = false,
                                killSuzuki = false,
                                killSuzuki2 = false,
                                killSuzuki3 = false,
                                killSuzuki4 = false,
                                killSuzuki5 = false,
                                killSuzuki6 = false,
                                takeClover = false,
                                takeBook = false,
                                takeHeart = false,
                                monsterAliveRed = true,
                                monsterAliveGreen = true,
                                monsterAliveBig = true,
                                monsterAliveChild = true,
                                killMonsterCount = 0,
                                killMonsterCount2 = 0,
                                oneResult = false;

                            let cloverHash = {
                                x: Math.random() * ((blocks[4].x + 428) - blocks[4].x) + blocks[4].x,
                                y: blocks[4].y - 82 - 10,
                            };
                            let clovers = [];
                            clovers.push(Object.create(cloverHash));
                            let bookHash = {
                                x: Math.random() * ((blocks[5].x + 428) - blocks[5].x) + blocks[5].x,
                                y: blocks[5].y - 74 - 10,
                            };
                            let bookArr = [];
                            bookArr.push(Object.create(bookHash));

////////////////////////////
                            function fight(sp, xB) {

                                playMusic(audioShot);

                                let bulletObj = {
                                    x: xB,
                                    y: pointY - dy + manHeight / 2.1,
                                    w: 7,
                                    h: 7,
                                    speed: sp,
                                };

                                let bullets = [];//массив пуль
                                bullets.push(Object.create(bulletObj));//при каждом клике в массив добавляется новая пуля
                                requestAnimationFrame(tickBullet);

                                function tickBullet() {
                                    for (let i = 0; i < bullets.length; i++) {//для каждой пули массива
                                        let bullet = bullets[i];
                                        ctxBullet.clearRect(bullet.x - 10, bullet.y - 10, bullet.w + 10, bullet.h + 10);
                                        bullet.x = bullet.x + bullet.speed;
                                        ctxBullet.fillStyle = '#421306';
                                        ctxBullet.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);

                                        function scream() {
                                            ctxBullet.clearRect(bullet.x - 10, bullet.y - 10, bullet.w + 10, bullet.h + 10);
                                            bullets.splice(i, 1);
                                            ctxNumber.clearRect(20, 100, canvasNumber.width, 80);
                                            ctxNumber.fillText(scoreCount, canvasNumber.width / 2 - 15, 159);
                                            playMusic(audioMonster);
                                        }

                                        for (let j = 0; j < monsters.length; j++) {//убийство монстра пулей
                                            let mArmy = monsters[j];
                                            if ((bullet.x > mArmy.x && bullet.x < mArmy.x + mArmy.width) && (bullet.y > mArmy.y && bullet.y < mArmy.y + mArmy.height)) {
                                                scoreCount += mArmy.score;
                                                scream();
                                                setTimeout(function () {
                                                    ctxMonster.clearRect(mArmy.blockX, mArmy.blockY, 428, mArmy.height);
                                                    monsters.splice(j, 1);
                                                    for (let g = 0; g < clovers.length; g++) {
                                                        let clovers_ = clovers[g];
                                                        ctxArtifact.drawImage(clover, clovers_.x, clovers_.y);
                                                    }
                                                    monsterAliveRed = false;
                                                    killMonsterCount++;
                                                }, 300);
                                            }
                                        }
                                        for (let j = 0; j < monstersGreen.length; j++) {//убийство монстра пулей
                                            let mArmy = monstersGreen[j];
                                            if ((bullet.x > mArmy.x && bullet.x < mArmy.x + mArmy.width) && (bullet.y > mArmy.y && bullet.y < mArmy.y + mArmy.height)) {
                                                scoreCount += mArmy.score;
                                                scream();
                                                setTimeout(function () {
                                                    ctxMonster.clearRect(mArmy.blockX, mArmy.blockY, 428, mArmy.height);
                                                    monstersGreen.splice(j, 1);
                                                    for (let g = 0; g < bookArr.length; g++) {
                                                        let bookArr_ = bookArr[g];
                                                        ctxArtifact.drawImage(book, bookArr_.x, bookArr_.y);
                                                    }
                                                    monsterAliveGreen = false;
                                                    killMonsterCount++;
                                                }, 300);
                                            }
                                        }
                                        for (let k = 0; k < bigMonsterArr.length; k++) {
                                            let mArmy = bigMonsterArr[k];
                                            if ((bullet.x > mArmy.x && bullet.x < mArmy.x + mArmy.width) && (bullet.y > mArmy.y && bullet.y < mArmy.y + mArmy.height)) {
                                                scoreCount += mArmy.score;
                                                scream();
                                                setTimeout(function () {
                                                    ctxMonster.clearRect(0, 0, canvas.width, canvas.height);
                                                    bigMonsterArr.splice(k, 1);
                                                    monsterAliveBig = false;
                                                    killMonsterCount2++;
                                                }, 300);
                                            }
                                        }
                                        for (let z = 0; z < children.length; z++) {
                                            let mArmy = children[z];
                                            if ((bullet.x > mArmy.x && bullet.x < mArmy.x + mArmy.width) && (bullet.y > mArmy.y && bullet.y < mArmy.y + mArmy.height)) {
                                                scoreCount += mArmy.score;
                                                scream();
                                                setTimeout(function () {
                                                    ctxChildren.clearRect(0, 0, canvas.width, canvas.height);
                                                    children.splice(z, 1);
                                                    monsterAliveChild = false;
                                                    killMonsterCount2++;
                                                }, 300);
                                            }
                                        }
                                        if (bullet.x > canvas.width - 25 || bullet.x < 25) {
                                            ctxBullet.clearRect(bullet.x - 10, bullet.y - 10, bullet.w + 10, bullet.h + 10);
                                            bullets.splice(i, 1);//удаление последнего элемента массива, если он вышел за пределы канваса
                                        }
                                    }
                                    requestAnimationFrame(tickBullet);
                                }
                            }

////////////////////////////
                            function stayMan(staySuzuki) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(staySuzuki, dx - manWidth / 2, pointY - dy);
                            }

                            function jumpMan(jumpSuzuki) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(jumpSuzuki, dx - manWidth / 2, pointY - dy);
                            }

                            function tick(x) {
                                if (tickCount > 10) {
                                    tickCount = 0;
                                    drawSprite(x);
                                }
                                tickCount++;
                            }

                            function drawSprite(sy) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);//очистка канваса
                                sx = (sx === 756 ? 0 : sx + 108); //переброс в начало, если спрайт закончился 864 - width картинки, 864/8 =108 -шаг, на который сдвигаем
                                ctx.drawImage(sprite, sx, sy, 105, 130, dx - manWidth / 2, pointY - dy, manWidth, manHeight);//отображение первого спрайта
                            }

                            function keyDown(e) {
                                if (e.keyCode === 32) jumpPressed = true;
                                if (e.keyCode === 37) leftPressed = true;
                                if (e.keyCode === 39) rightPressed = true;
                                if (e.keyCode === 68) dPressed = true;
                            }

                            function keyUp(e) {
                                if (e.keyCode === 32) jumpPressed = false;
                                if (e.keyCode === 37) leftPressed = false;
                                if (e.keyCode === 39) rightPressed = false;
                                if (e.keyCode === 68) dPressed = false;
                            }

                            document.addEventListener('keydown', keyDown, false);
                            document.addEventListener('keyup', keyUp, false);

                            function death() {
                                playMusic(audioDeath);
                                canvas.style.opacity = '0.5';
                                setTimeout(function () {
                                    canvas.style.opacity = '1';
                                    dx = 50;
                                    dy = 0;
                                }, 300);
                                countCrash++;
                                heartsCount--;
                                ctxNumber.clearRect(0, 0, canvasNumber.width, 100);
                                ctxNumber.fillText(heartsCount, canvasNumber.width / 2 - 15 / 3, 59);
                            }

                            function forCancel() {
                                function cancel(e) {//отмена воздействия на Сузуки с помощью клавиш клавиатуры
                                    if (e.keyCode === 32) jumpPressed = false;
                                    if (e.keyCode === 37) leftPressed = false;
                                    if (e.keyCode === 39) rightPressed = false;
                                    if (e.keyCode === 68) dPressed = false;
                                }

                                document.addEventListener('keydown', cancel, false);
                            }

                            function deathForever() {
                                if (heartsCount === 0) { //финальная заставка, если жизни кончились
                                    blackFon.style.display = 'block';
                                    gameOver.style.display = 'block';
                                    end.style.display = 'block';
                                    badFinish.style.display = 'block';
                                    forCancel();
                                }
                            }

                            function update() {
                                let x = 0, y = 0;/////////////////////////////////////////////////
                                if (rightPressed) {//проверка, в какую сторону пошёл Сузуки
                                    facingRight = true;
                                    x += speed;
                                } else if (leftPressed) {
                                    facingRight = false;
                                    x -= speed;
                                }
                                if (dPressed && !inFall && !inJump && canJump && !rightPressed && !leftPressed) {//вызов функции стрельбы,если нажали на D
                                    dPressed = false;
                                    if (facingRight) fight(9, dx + manWidth / 3);
                                    else fight(-9, dx - manWidth / 2);
                                }///////////////////////////////////////////////////////////////

                                for (let j = 0; j < monsters.length; j++) {//отвечает за возвращение сузуки на место, если его убил монстр
                                    let mArmy = monsters[j];
                                    if (((dx > mArmy.x && dx < mArmy.x + mArmy.width) && (dy > mArmy.y && dy < mArmy.y + mArmy.height))) {
                                        if (!killSuzuki) {
                                            death();
                                            killSuzuki = true;
                                        }
                                    } else killSuzuki = false;
                                }
                                for (let k = 0; k < monstersGreen.length; k++) {
                                    let mArmy2 = monstersGreen[k];
                                    if (((dx < mArmy2.x + 100 && mArmy2.x + 100 < dx + manWidth) || (mArmy2.x + mArmy2.width > dx && mArmy2.x + mArmy2.width < dx + manWidth))
                                        && canvas.height - dy - manHeight < blocks[5].y && canvas.height - dy - manHeight > blocks[4].y) {
                                        if (!killSuzuki2) {
                                            death();
                                            killSuzuki2 = true;
                                        }
                                    } else killSuzuki2 = false;
                                }

                                deathForever();

                                for (let k = 0; k < coins.length; k++) {//условие, когда Сузуки собирает монетку
                                    let coins_ = coins[k];
                                    if ((coins_.x > dx - 50) && (dx + manWidth - 60 > coins_.x) && (canvas.height - dy > coins_.above + 42) &&
                                        (canvas.height - dy - 20 < coins_.block)) {
                                        if (!takeMoney) {
                                            playMusic(audioMoney);
                                            ctxCoins.clearRect(coins_.x, coins_.y, coins_.width, coins_.height);
                                            coins.splice(k, 1);
                                            coinCount += 5;
                                            ctxNumber.clearRect(canvasNumber.width / 2 - 47 / 2, canvasLevel.height - 367 - 57, canvasNumber.width, 100);
                                            ctxNumber.fillText(coinCount, canvasNumber.width / 2 - 15 / 2.2, canvasNumber.height - 367 - 27);
                                            takeMoney = true;
                                        }
                                    } else {
                                        takeMoney = false;
                                    }
                                }///////////////////////////////////////////////////////////////

                                if (!monsterAliveRed) {//выброс клевера
                                    for (let i = 0; i < clovers.length; i++) {
                                        let clovers_ = clovers[i];
                                        let xCl = clovers_.x;
                                        let yCl = clovers_.y;
                                        if (dx < xCl && dx + manWidth > xCl + 82 && canvas.height - dy - manHeight < blocks[4].y && canvas.height
                                            - dy - manHeight > blocks[3].y) {
                                            if (!takeClover) {
                                                playMusic(audioMoney);
                                                ctxArtifact.clearRect(xCl, yCl, 82, 82);
                                                clovers.splice(i, 1);
                                                coinCount += 10;
                                                ctxNumber.clearRect(canvasNumber.width / 2 - 47 / 2, canvasLevel.height - 367 - 57, canvasNumber.width, 100);
                                                ctxNumber.fillText(coinCount, canvasNumber.width / 2 - 15 / 2.2, canvasNumber.height - 367 - 27);
                                                takeClover = true;
                                            }
                                        } else takeClover = false;
                                    }
                                }///////////////////////////////////////////////////////////////
                                if (!monsterAliveGreen) {//выброс книжки
                                    for (let i = 0; i < bookArr.length; i++) {
                                        let bookArr_ = bookArr[i];
                                        let xBB = bookArr_.x;
                                        let yBB = bookArr_.y;
                                        if (dx < xBB && dx + manWidth > xBB + 69 && canvas.height - dy - manHeight < blocks[5].y && canvas.height
                                            - dy - manHeight > blocks[4].y) {
                                            if (!takeBook) {
                                                playMusic(audioMoney);
                                                ctxArtifact.clearRect(xBB, yBB, 78, 69);
                                                bookArr.splice(i, 1);
                                                coinCount += 10;
                                                ctxNumber.clearRect(canvasNumber.width / 2 - 47 / 2, canvasLevel.height - 367 - 57, canvasNumber.width, 100);
                                                ctxNumber.fillText(coinCount, canvasNumber.width / 2 - 15 / 2.2, canvasNumber.height - 367 - 27);
                                                takeBook = true;
                                            }
                                        } else takeBook = false;
                                    }///////////////////////////////////////////////////////////////
                                }

                                //убийство шипами
                                if ((dx > canvasFon.width - 240 && dx < canvasFon.width - 120 && canvas.height - dy + 15
                                    > canvasFon.height) || (dx > 25 && dx < 105 && canvas.height - dy > 440 && canvas.height - dy < 475)) {
                                    if (!killSuzuki3) {
                                        if (!nextClick) {
                                            death();
                                            killSuzuki3 = true;
                                        }
                                    }
                                } else killSuzuki3 = false;
                                ///////////////////////////////////////////////////////////////WIN
                                if (killMonsterCount === 2) {
                                    setTimeout(function () {
                                        end.style.display = 'block';
                                        goodFinish.style.display = 'block';
                                        nextLevel.style.pointerEvents = 'auto';
                                        nextLevel.style.backgroundColor = 'black';
                                        clearInterval(timer1);
                                        // let settings = {
                                        //     name: nameInput.value,
                                        //     result: [sec, scoreCount, coinCount],
                                        // };
                                        // firebaseStorage.addPlayer(settings.name, settings.result, settings.result[0]);
                                        killMonsterCount = 0;
                                    }, 8000)
                                }
                                ///////////////////////////////////////////////////////////////WIN

                                if (inJump) {//если в прыжке, то Сузуки не может прыгать и его координата y отнимается
                                    canJump = false;
                                    jumpCount++;
                                    y += 5 * (1 - jumpCount / jumpLength);
                                    if (jumpCount > jumpLength) {
                                        jumpCount = 0;
                                        inJump = false;
                                    }
                                } else {//если не в прыжке
                                    if (jumpPressed) {//была нажата клавиша прыжка
                                        jumpPressed = false;
                                        if (canJump) {//и он может прыгать, то пускай себе прыгает
                                            inJump = true;
                                            currentBlock = null;
                                        }
                                    }
                                    if (!canJump && !inFall) {//если не может прыгать, но и не падает, то значит стоит упасть
                                        inFall = true;
                                        fallCount = 0;
                                    }
                                    if (inFall) {//если всё же падает, то координата по y начинает увеличиваться
                                        fallCount++;
                                        y -= fallCount * fallSpeed;
                                    }
                                }
                                move(x, y);//поступают x, y, полученные в функции update
                            }

                            function checkBlocks() {//проверка на блоке ли Сузуки//////
                                for (let i = 0; i < blocks.length; i++) {//пробег по массиву блоков
                                    let block = blocks[i];//если координаты Сузуки входят в плоскость блока
                                    if (block.x <= dx && block.x + block.width >= dx && block.y + block.height >= dy + 25 && block.y < dy + 25) {
                                        dy = block.y - 25;//изменяем текущее положение Сузуки
                                        canJump = true;
                                        inFall = false;
                                        currentBlock = block; //превращение текущего блока в блок из массива
                                    }
                                }
                            }

                            function move(x, y) {
                                dx += x;
                                dy += y;
                                if (dx < 25 + manWidth / 2) dx = 25 + manWidth / 2; //проверка на выход Сузуки из зоны влево
                                else if (dx > pointX) dx = pointX;// выход вправо
                                if (dy < 0) { //выход из поля канваса внизу(так как проверяется dy, а не координата в целом)
                                    dy = 0;
                                    canJump = true;
                                    inFall = false;
                                } else if (dy >= pointY) { //выход из канваса вверху
                                    inJump = false;
                                    jumpCount = 0;
                                }

                                if (inFall) checkBlocks();//если находится в падении, то начинается проверка, упал ли сузуки на блок
                                else { //если не в падении
                                    if (x !== 0 && currentBlock != null) { //где-то гуляет, но на блоке
                                        if (dx < currentBlock.x || dx > currentBlock.x + currentBlock.width) {//если левая координата x блока больше координаты Сузуки или правая координата меньше,
                                            currentBlock = null;//то, под Сузуки блока нет, снова начать проверку, он падает, обнуление количества падений.
                                            checkBlocks();
                                            inFall = true;
                                            fallCount = 0;
                                        }
                                    }
                                }
                                if (!inJump) {//если не в прыжкке
                                    if (x !== 0) {//всё ещё где-то гуляет
                                        tick(x > 0 ? 0 : 150);//то пускай побегает, если x возрастает, то значит идёт вправо, вот и выбери спрайт с правым ходом, а если уменьшается, то влево
                                    } else {//если стоит
                                        if (canJump)//и может прыгать
                                            stayMan(facingRight ? staySuzukiRight : staySuzukiLeft);//то отрисовываем стоящий спрайт
                                        else//а если не может прыгать, значит очевидно он прямо сейчас прыгает
                                            jumpMan(facingRight ? jumpSuzukiRight : jumpSuzukiLeft);//отрисовываем его в прыжке
                                    }
                                } else {//если в прыжке то пускай спокойно прыгает себе
                                    jumpMan(facingRight ? jumpSuzukiRight : jumpSuzukiLeft);
                                }
                            }

                            setInterval(update, 10);

                            nextLevel.addEventListener('click', function () {
                                function tickSecond() {
                                    sec2++;
                                }

                                timer2 = setInterval(tickSecond, 1000);
                                nextClick = true;
                                killMonsterCount = 0;
                                dx = 50;
                                dy = 0;
                                end.style.display = 'none';
                                blackFon.style.display = 'none';
                                gameOver.style.display = 'none';
                                goodFinish.style.display = 'none';
                                nextLevel.style.pointerEvents = 'none';
                                nextLevel.style.backgroundColor = 'grey';

                                for (let i = 0; i < coins.length; i++) coins.length = 0;
                                ctxCoins.clearRect(0, 0, canvasCoins.width, canvasCoins.height);
                                for (let i = 0; i < clovers.length; i++) clovers.length = 0;
                                for (let i = 0; i < bookArr.length; i++) bookArr.length = 0;
                                ctxArtifact.clearRect(0, 0, canvasArtifact.width, canvasArtifact.height);

                                ctxFon.clearRect(0, 0, canvasFon.width, canvasFon.height);//создание уровня
                                ctxFon.fillStyle = ctxFon.createPattern(fon2, 'repeat');
                                ctxFon.fillRect(25, 25, canvasFon.width - 50, canvasFon.height - 50);
                                ctxBlock.clearRect(0, 0, canvasBlock.width, canvasBlock.height);
                                createWorld('#a59112', '#e7b26c', 90, 5, 25);
                                ctxMachine.drawImage(gunMachine, 20, 368);//создание пулемета
                                let machineObj = {
                                    x: 86,
                                    y: 387,
                                    w: 10,
                                    h: 10,
                                    speed: 6,
                                };
                                let machine = [];//массив пуль
                                machine.push(Object.create(machineObj));//при каждом клике в массив добавляется новая пуля
                                requestAnimationFrame(tickMachine);

                                function tickMachine() {
                                    for (let i = 0; i < machine.length; i++) {//для каждой пули массива
                                        let machine_ = machine[i];
                                        ctxMachine.clearRect(machine_.x - 10, machine_.y - 10, machine_.w + 10, machine_.h + 10);
                                        machine_.x = machine_.x + machine_.speed;
                                        ctxMachine.fillStyle = '#483d09';
                                        ctxMachine.fillRect(machine_.x, machine_.y, machine_.w, machine_.h);
                                        if ((machine_.x > dx && machine_.x < dx + manWidth) && (machine_.y < canvas.height - dy &&
                                            machine_.y > canvas.height - dy - manHeight)) {
                                            if (!machineFight) {
                                                death();
                                                machineFight = true;
                                            }
                                        } else machineFight = false;
                                        if (machine_.x > canvasMachine.width - 25) {
                                            ctxMachine.clearRect(machine_.x - 10, machine_.y - 10, machine_.w + 10, machine_.h + 10);
                                            machine.splice(i, 1);
                                            machine.push(Object.create(machineObj));
                                        }
                                    }
                                    requestAnimationFrame(tickMachine);
                                }//////////////////////////////////////////////////////////////////////

                                ctxLevel.clearRect(10, canvasLevel.height - 367, canvasLevel.width - 20, canvasLevel.height - 40);
                                ctxLevel.fillStyle = '#0e3543';//новый уровень в блоке слева
                                ctxLevel.fillRect(10, canvasLevel.height - 367, canvasLevel.width - 20, canvasLevel.height - 40);
                                ctxLevel.drawImage(level2, 0, canvasLevel.height - 367);

                                addCoins();//загрузка монет

                                blocks = [ //массив блоков с карты new
                                    {x: 25, y: 150, width: 150, height: 25},
                                    {x: 753, y: 150, width: 150, height: 25},
                                    {x: 100, y: 300, width: 264, height: 25},
                                    {x: 564, y: 300, width: 264, height: 25},//
                                    {x: 100, y: 450, width: 200, height: 25},//
                                    {x: 603, y: 450, width: 200, height: 25},
                                    {x: 364, y: 200, width: 225, height: 25},
                                    {x: 100, y: 450, width: 25, height: 150},
                                    {x: 803, y: 450, width: 25, height: 150},
                                    {x: 364, y: 300, width: 25, height: 100},
                                    {x: 564, y: 300, width: 25, height: 100},
                                ];
                                let verticalBlocks = [
                                    {x: 100, y: 450, width: 25, height: 150},
                                    {x: 803, y: 450, width: 25, height: 150},
                                ];
                                let vertSmall = [
                                    {x: 364, y: 300, width: 25, height: 100},
                                    {x: 564, y: 300, width: 25, height: 100},
                                ];
                                for (let i = 0; i < blocks.length; i++) {//отрисовка каждого блока
                                    let block = blocks[i];
                                    ctxFon.fillRect(block.x, canvas.height - block.y, block.width, block.height);
                                }

                                function vertical() {//запрет на движение через вертикальные блоки
                                    for (let j = 0; j < verticalBlocks.length; j++) {
                                        let vert = verticalBlocks[j];
                                        if (dx > vert.x && dx < vert.x + vert.width && vert.y > canvas.height - dy && canvas.height - dy > vert.y - vert.height) {
                                            if (leftPressed) dx = vert.x + vert.width + manWidth / 2;
                                            if (rightPressed) dx = vert.x - vert.width - manWidth / 3;
                                        }
                                    }
                                    for (let k = 0; k < vertSmall.length; k++) {
                                        let vertS = vertSmall[k];
                                        if (dx > vertS.x && dx < vertS.x + vertS.width && vertS.y < canvas.height - dy - 50 && canvas.height - dy - manHeight < vertS.y) {
                                            if (leftPressed) dx = vertS.x + vertS.width + manWidth / 2;
                                            if (rightPressed) dx = vertS.x - vertS.width - manWidth / 3;
                                        }
                                    }
                                }

                                let bigMonsterH = {//монстр с блевотиной
                                    x: blocks[2].x,
                                    y: blocks[2].y - 123,
                                    blockW: 703,
                                    blockX: blocks[2].x,
                                    blockY: blocks[2].y - 123,
                                    width: 120,
                                    height: 123,
                                    speed: 2.4,
                                    score: 300,
                                };

                                let slimeH = {
                                    x: -45,
                                    y: bigMonsterH.y + bigMonsterH.height,
                                    w: 32,
                                    h: 32,
                                    speed: 4,
                                };

                                let childrenH = {
                                    x: blocks[3].x,
                                    y: blocks[3].y - 117,
                                    blockW: blocks[3].width,
                                    blockX: blocks[3].x,
                                    blockY: blocks[3].y - 117,
                                    width: 123,
                                    height: 117,
                                    speed: 2,
                                    score: 100,
                                }

                                bigMonsterArr.push(Object.create(bigMonsterH));
                                slimeArr.push(Object.create(slimeH));
                                children.push(Object.create(childrenH));
                                requestAnimationFrame(bigMonsterF);

                                function theSame(kappa, killTick) {
                                    kappa.x += kappa.speed;
                                    if (kappa.x > kappa.blockX + kappa.blockW - kappa.width - 15) {
                                        kappa.speed = -kappa.speed;
                                        kappa.x = kappa.blockX + kappa.blockW - kappa.width - 15;
                                    }
                                    if (kappa.x < kappa.blockX + 15) {
                                        kappa.speed = -kappa.speed;
                                        kappa.x = kappa.blockX + 15;
                                    }
                                    if (((dx > kappa.x && dx < kappa.x + kappa.width) && (dy > kappa.y && dy < kappa.y + kappa.height))) {
                                        if (!killTick) {
                                            death();
                                            killTick = true;
                                        }
                                    } else killTick = false;
                                }

                                function bigMonsterF() {
                                    for (let i = 0; i < bigMonsterArr.length; i++) {
                                        let mArmy = bigMonsterArr[i];
                                        ctxMonster.clearRect(mArmy.blockX, mArmy.blockY, mArmy.blockW, mArmy.height);
                                        ctxMonster.drawImage(bigMonster, mArmy.x, mArmy.y);
                                        theSame(mArmy, killSuzuki4);
                                    }

                                    if (!monsterAliveBig) {
                                        for (let l = 0; l < children.length; l++) {
                                            let child_ = children[l];
                                            ctxChildren.clearRect(child_.blockX, child_.blockY, child_.blockW, child_.height);
                                            ctxChildren.drawImage(oneEye, child_.x, child_.y);
                                            theSame(child_, killSuzuki5);
                                        }
                                    }

                                    for (let i = 0; i < slimeArr.length; i++) {
                                        let slime_ = slimeArr[i];
                                        ctxMonster.clearRect(slime_.x - 20, slime_.y - 10, slime_.w + 35, slime_.h + 35);
                                        slime_.y = slime_.y + slime_.speed;
                                        ctxMonster.drawImage(slime, slime_.x, slime_.y);
                                        for (let i = 0; i < bigMonsterArr.length; i++) {
                                            let mArmy = bigMonsterArr[i];
                                            slime_.x = mArmy.x + mArmy.width / 3;
                                        }
                                        if ((slime_.x > dx && slime_.x < dx + manWidth - 100) && (slime_.y < canvas.height - dy &&
                                            slime_.y > canvas.height - dy - manHeight)) {
                                            if (!slimeFight) {
                                                death();
                                                slimeFight = true;
                                            }
                                        } else slimeFight = false;
                                        if (slime_.y + slime_.h > canvasMonster.height - 25) {
                                            ctxMonster.clearRect(slime_.x - 10, slime_.y - 10, slime_.w + 10, slime_.h + 10);
                                            slimeArr.splice(i, 1);
                                            slimeArr.push(Object.create(slimeH));
                                        }
                                    }
                                    requestAnimationFrame(bigMonsterF);
                                }


                                function tickL2() {
                                    vertical();
                                    deathForever();
                                    if (killMonsterCount2 === 2) {
                                        setTimeout(function () {
                                            blackFon.style.display = 'block';
                                            gameOver.style.display = 'block';
                                            end.style.display = 'block';
                                            goodFinish.style.display = 'block';
                                            // nextLevel.style.pointerEvents = 'auto';
                                            // nextLevel.style.backgroundColor = 'black';
                                            clearInterval(timer2);
                                            let sec = sec1 + sec2;
                                            let settings = {
                                                name: nameInput.value,
                                                result: [sec, scoreCount, coinCount],
                                            };
                                            firebaseStorage.addPlayer(settings.name, settings.result, settings.result[0]);
                                            killMonsterCount = 0;
                                        }, 8000)
                                    }
                                }

                                setInterval(tickL2, 10);
                            });
                        }

                        suzuki();
                    };
                };
            };
        };
    };
};