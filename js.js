
let players = {
    name1: '',
    name2: '',
    player1: 'X',
    player2: 'O',
    countWins1: 0,
    countWins2: 0,
};

const boardSize = 3;
let currentPlayer = players.player2;
let domElementsModel = [];
let flagIsWin = false;

let startGameBtn = document.getElementById('startGameBtn');
let board = document.getElementById('board');
let rows = document.getElementsByClassName('row');
let newGameBtn = document.getElementById('newGame');
let game = document.getElementById('game');
let playerNameTd1 = document.getElementById('playersName1');
let playerNameTd2 = document.getElementById('playersName2');
let scoreWin1 = document.getElementById('scoreWin1');
let scoreWin2 = document.getElementById('scoreWin2');


domElementsModel = Array.from(Array(3), i => []);
createBoard();

window.addEventListener('load',  onLoad);
startGameBtn.addEventListener('click', startGame);
board.addEventListener('click', fillBoard);
newGameBtn.addEventListener('click', newGame);
window.addEventListener('beforeunload', onBeforeUnload);



function onLoad(){
    localStorageCountWins();
    if (localStorage.getItem('currentPlayer')) currentPlayer = localStorage.getItem('currentPlayer');
    if(localStorage.getItem('domElementsModel')){
        game.classList.remove('hide');
        startGameBtn.classList.add('hide');
        alert(`Сейчас ход ${currentPlayer === 'O'? 'X' : 'O'}`);

        let domElements = localStorage.getItem('domElementsModel');
        let domElementsParse = JSON.parse(domElements);
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if(domElementsParse[i][j] === undefined){
                    domElementsParse[i][j] = '';
                }
                if (domElementsParse[i][j] === domElementsModel[i][j]) return;
                else domElementsModel[i][j] = domElementsParse[i][j];
                rows[i].children[j].innerHTML = domElementsParse[i][j];
            }
        }
    }
}



function onBeforeUnload() {
    if(players.name1) localStorage.setItem('name1', players.name1);

    if(players.name2) localStorage.setItem('name2', players.name2);

    players.countWins1 ? localStorage.setItem('countWin1', players.countWins1):  scoreWin1.innerHTML = players.countWins1;
    players.countWins2 ? localStorage.setItem('countWin2', players.countWins2): scoreWin2.innerHTML = players.countWins2;
    localStorage.setItem('currentPlayer', currentPlayer);

    if(domElementsModel.some(elem => elem.includes('X'))){
        localStorage.setItem('domElementsModel', JSON.stringify(domElementsModel));
    }
}



function togglePlayer (){
    currentPlayer === players.player1 ? currentPlayer = players.player2: currentPlayer = players.player1;
}



function startGame(event){
    let target = event.target;

    if (target.id === 'startGameBtn'){
        let game = document.getElementById('game');
        game.classList.remove('hide');
        startGameBtn.classList.add('hide');

        players.name1 = prompt("Введите имя игрока за крестики", 'Игрок 1');
        players.name2 = prompt("Введите имя игрока за нолики", 'Игрок 2');
    }

        playerNameTd1.innerHTML = players.name1;
        playerNameTd2.innerHTML = players.name2;

        alert(`Начинает ${players.name1} за крестики`);
}



function createBoard (){
    for (let i=0; i < boardSize; i++){//сделать отдельную функцию
        let div = document.createElement('div');
        div.className = ('row');
        board.appendChild(div);
        rows[i].setAttribute('dataX', i);
        for (let j = 0; j < boardSize; j++) {
            rows[i].innerHTML +='<div class="cell"></div>';
            let cols = rows[i].childNodes;
            cols[j].setAttribute('dataY', j);
        }
    }
}



function fillBoard(event) {
    let target = event.target;
    if (target.className === 'cell') {
        togglePlayer();
        if(!target.innerHTML){
            currentPlayer === players.player1? target.innerHTML = players.player1: target.innerHTML = players.player2;
        }
        else {
            togglePlayer();
            alert('Поле уже заполнено');
        }
    }
    let placeY = target.getAttribute('dataY');
    let placeX = target.parentElement.getAttribute('dataX');
    domElementsModel[placeX][placeY] = target.innerHTML;

    notifyWinner();
    score();
    stopFillBoard();
}



function stopFillBoard() {
    if(flagIsWin){
        board.removeEventListener('click', fillBoard);
    }
}



function checkDiagonal() {
    let toRight = true;
    let toLeft = true;
    for (let i = 0; i < boardSize; i++) {
        toRight = toRight && (domElementsModel[i][i] === currentPlayer);
        toLeft = toLeft && (domElementsModel[i][boardSize - 1 - i] === currentPlayer);
    }
    if(toLeft || toRight) return true;
}



function checkLines(){
    for (let i = 0; i < boardSize; i++) {
        let checkRow = true;
        let checkCol = true;
        for (let j = 0; j < boardSize; j++) {
            checkRow = checkRow && (domElementsModel[i][j] === currentPlayer);
            checkCol = checkCol && (domElementsModel[j][i] === currentPlayer);
        }
        if(checkRow || checkCol) return true;
    }
}



function notifyWinner() {
    if(checkDiagonal() || checkLines()){
        currentPlayer === players.player1 ?
            alert(`Победил ${players.name1 || localStorage.getItem('name1')}`):
            alert(`Победил ${players.name2 || localStorage.getItem('name2')}`);
        flagIsWin = true;
    }
}



function score (){
    if (flagIsWin){
        if (currentPlayer === players.player1){
            players.countWins1++;
            localStorageCountWins();
        }
        else {
            players.countWins2++;
            localStorageCountWins();
        }
    }
}



function localStorageCountWins(){
    localStorage.getItem('countWin1') ?
        scoreWin1.innerHTML = Number(localStorage.getItem('countWin1')) + players.countWins1 :
        scoreWin1.innerHTML = players.countWins1;

    localStorage.getItem('countWin2') ?
        scoreWin2.innerHTML = Number(localStorage.getItem('countWin2')) + players.countWins2 :
        scoreWin2.innerHTML = players.countWins2;
}



function newGame (){
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            rows[i].children[j].innerHTML = '';
            domElementsModel[i][j] = '';
            currentPlayer = players.player2;
            flagIsWin = false;
            board.addEventListener('click', fillBoard);
        }
    }
}






