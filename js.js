
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


createBoard();
startGameBtn.addEventListener('click', startGame);
board.addEventListener('click', fillBoard);
newGameBtn.addEventListener('click', newGame);



function togglePlayer (){
    if(currentPlayer === players.player1){
        currentPlayer = players.player2;
    }
    else {
        currentPlayer = players.player1;
    }
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
        let playerNameTd1 = document.getElementById('playersName1');
        let playerNameTd2 = document.getElementById('playersName2');

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


for (let i = 0; i < boardSize; i++) {
    domElementsModel.push([]);
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
        if(currentPlayer === players.player1){
            alert(`Победил ${players.name1}`);
        }
        else {
            alert(`Победил ${players.name2}`);
        }
        flagIsWin = true;
    }
}


function score (){
    let scoreWin1 = document.getElementById('scoreWin1');
    let scoreWin2 = document.getElementById('scoreWin2');

    if (flagIsWin){
        if (currentPlayer === players.player1){
            players.countWins1++;
            scoreWin1.innerHTML = players.countWins1;
        }
        else {
            players.countWins2++;
            scoreWin2.innerHTML = players.countWins2;
        }
    }
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




