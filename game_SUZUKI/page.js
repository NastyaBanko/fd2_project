let body = document.getElementById('kappa');
body.innerHTML = '<header>\n' +
    '    <div id="Container">\n' +
    '        <div id="all">\n' +
    '            <audio id="music" src="http://d.zaix.ru/drkX.mp3" type="audio/mp3; codecs=vorbis" preload="auto" controls\n' +
    '       autoplay="autoplay" loop="loop" style="display:none;"></audio>' +
    '<div id="menu">\n' +
    '                <ul id="menuUl">\n' +
    '                    <li id="main" style="color:white">MAIN</li>\n' +
    '                    <li id="start">START</li>\n' +
    '                    <li id="records">RECORDS</li>\n' +
    '                    <li id="rules">RULES</li>\n' +
    '                    <li id="nextLevel" style="display:none;">NEXT</li>\n' +
    '                    <li id="why" style="margin-top:287px;border:none;"></li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div id="content">' +
    '<div id="mainPart">Main</div>' +
    '<div id="startPart" style="display:none;">Start</div>' +
    '<div id="recordsPart" style="display:none;">Records</div>' +
    '<div id="rulesPart" style="display:none;">Rules</div>' +
    '</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</header>';

let main = document.getElementById('main'),
    start = document.getElementById('start'),
    records = document.getElementById('records'),
    rules = document.getElementById('rules'),
    mainPart = document.getElementById('mainPart'),
    startPart = document.getElementById('startPart'),
    recordsPart = document.getElementById('recordsPart'),
    rulesPart = document.getElementById('rulesPart'),
    nextLevel = document.getElementById('nextLevel'),
    forMenu = document.getElementById('why');

function likeSPA(visible, other1, other2, other3, activeLi, li1, li2, li3) {
    visible.style.display = 'block';
    other1.style.display = 'none';
    other2.style.display = 'none';
    other3.style.display = 'none';
    activeLi.style.color = 'white';
    li1.style.color = '#9eabb7';
    li2.style.color = '#9eabb7';
    li3.style.color = '#9eabb7';
}

main.addEventListener('click', function () {
    likeSPA(mainPart, startPart, recordsPart, rulesPart, main, start, records, rules);
});

start.addEventListener('click', function () {
    likeSPA(startPart, mainPart, recordsPart, rulesPart, start, main, records, rules);
    let audioMain = document.getElementById('music');
    playMusic(audioMain);
    nextLevel.style.display = 'block';
    forMenu.style.marginTop = 287 - nextLevel.offsetHeight + 'px';
    nextLevel.style.pointerEvents = 'none';
    nextLevel.style.backgroundColor = 'grey';
});

records.addEventListener('click', function () {
    likeSPA(recordsPart, mainPart, startPart, rulesPart, records, start, main, rules);
    get();
});

rules.addEventListener('click', function () {
    likeSPA(rulesPart, mainPart, startPart, recordsPart, rules, start, records, main);
});

mainPart.innerHTML = '<div style="width:100%; height:600px; position: relative">\n' +
    '    <img id="nanali" src="person/Nanali.png" style="position: absolute;">\n' +
    '    <img id="suzukiFly" src="person/FlySuzuki.png" style="position: absolute; top:323px; left:644px">\n' +
    '<div id="yourName">\n' +
    '    WHAT\'S YOUR NAME?\n' +
    '    <input type="text" id="yourNameInput">\n' +
    '    <button id="ok">OK</button>\n' +
    '</div>' +
    '</div>';

rulesPart.innerHTML = "<div>\n" +
    "    <div style=\"font-size:25px;\"><span style=\"font-size:20px;\">To complete the level, you should kill all monsters\n" +
    "        and collect as much money as possible<br><br>First you should collect all coins, because money can't be in one place for too long" +
    "<br><br>Sometimes you have to jump to raise money</span>" +
    "<br><br>CONTROL\n" +
    "    </div>\n" +
    "    <ul class='rulesForGame'>\n" +
    "        <li>Run - Left and Right arrow</li>\n" +
    "        <li>Jump - Space</li>\n" +
    "        <li>Shoot - D</li>\n" +
    "    </ul>\n" +
    "</div>";

startPart.innerHTML = '<div id="end" style="z-index: 100; display:none; position: relative; margin: 0 auto; width: 100%;">\n' +
    '    <div id="blackFon" style="position: absolute; width:100%; height:600px;"></div>\n' +
    '    <div id="gameOver" style="position: absolute; width:100%; height:600px;">\n' +
    '        <img id="badFinish" style="margin-top: 15%; margin-left: 25%; display:none;" src="person/game-over.png">\n' +
    '        <img id="goodFinish" style="margin-top: 15%; margin-left: 25%; display:none;" src="person/wellDone.png">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div style="display: flex; justify-content: start; width: 100%; margin:0 auto;">\n' +
    '    <div style="width:12%; height:600px;">\n' +
    '        <div style="position: relative; width:71.5%">\n' +
    '            <canvas id="level" width="90" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '            <canvas id="number" width="90" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="position: relative; width:88%;">\n' +
    '        <canvas id="fon" width="928" height="600" style="position: absolute; width:100%">hi</canvas>\n' +
    '        <canvas id="manField" width="928" height="600" style="position: absolute; width:100%">hi</canvas>\n' +
    '        <canvas id="bullet" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        <canvas id="monster" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        <canvas id="coins" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        <canvas id="artifact" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        <canvas id="gunMachine" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '        <canvas id="children" width="928" height="600" style="position: absolute; width:100%"></canvas>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<canvas id="blocks" width="5" height="25"></canvas>';

recordsPart.innerHTML = '<table id="table" border="1" style="border-collapse: collapse; width:100%; margin-top:20px;">\n' +
    '    <tr>\n' +
    '        <th>NAME</th>\n' +
    '        <th>TIME</th>\n' +
    '        <th>SCORE</th>\n' +
    '        <th>COINS</th>\n' +
    '    </tr>\n' +
    '<tr id="bestPlayer" class="value"><td></td><td></td><td></td><td></td></tr>' +
    '<tr id="secondPlayer" class="value"><td></td><td></td><td></td><td></td></tr>' +
    '<tr id="thirdPlayer" class="value"><td></td><td></td><td></td><td></td></tr>' +
    '<tr id="fourthPlayer" class="value"><td></td><td></td><td></td><td></td></tr>' +
    '<tr id="fifthPlayer" class="value"><td></td><td></td><td></td><td></td></tr>' +
    '</table>';

let tr1 = document.getElementById('bestPlayer'),
    tr2 = document.getElementById('secondPlayer'),
    tr3 = document.getElementById('thirdPlayer'),
    tr4 = document.getElementById('fourthPlayer'),
    tr5 = document.getElementById('fifthPlayer');

let tr = document.getElementsByClassName('value');

function get() {
    const getPlayersPromise = new Promise((resolve, reject) => {
        const players = firebaseStorage.getPlayers();
        if (players) resolve(players);
        else reject(new Error('Не удалось получить список игроков'));
    });
    getPlayersPromise.then(
        response => {
            let keys = Object.keys(response);
            let sortable = [];//сортируем массив по наименьшему времени, массив массивов
            for (let key in response) {
                sortable.push([key, response[key]]);
            }
            sortable.sort(function (a, b) {
                return a[1][0] - b[1][0];
            });
            for (let i = 0; i < tr.length; i++) {
                let tr_ = tr[i];
                tr_.firstChild.innerHTML = sortable[i][0];
                tr_.firstChild.nextSibling.innerHTML = sortable[i][1][0] + " s";
                tr_.lastChild.previousSibling.innerHTML = sortable[i][1][1];
                tr_.lastChild.innerHTML = sortable[i][1][2];
            }
        },
        error => console.log(error.message));
}

let nameDiv = document.getElementById('yourName');
let nameInput = document.getElementById('yourNameInput');
let ok = document.getElementById('ok');
setTimeout(function () {
    nameDiv.style.display = 'block';
}, 1000);

setInterval(function () {
    if ((nameInput.value === null || nameInput.value.length >= 15 || nameInput.value === '')) {
        ok.disabled = true;
        ok.style.backgroundColor = 'grey';
        start.style.pointerEvents = 'none';
        start.style.backgroundColor = 'grey';
    } else {
        ok.disabled = false;
        ok.style.backgroundColor = 'black';
    }
}, 10);

ok.addEventListener('click', function () {
    nameDiv.style.display = 'none';
    start.style.pointerEvents = 'auto';
    start.style.backgroundColor = 'black';
});