
let startGame = document.getElementById('startGame');
let player1;
let player2;
startGame.onclick = function (event){
    let target = event.target;

    if (target.id === 'startGame'){
        let game = document.getElementById('game');
        game.style.visibility = 'visible';
        startGame.style.display = 'none';

        player1 = prompt("Введите имя игрока за крестики", 'Игрок 1');
        player2 = prompt("Введите имя игрока за нолики", 'Игрок 2');
    }
        let playerNameTd1 = document.getElementById('player1');
        let playerNameTd2 = document.getElementById('player2');

        playerNameTd1.innerHTML = player1;
        playerNameTd2.innerHTML = player2;

        alert(`Начинает ${player1} за крестики`);
};



let rows = 3;
let column = 3;

for (let i=0; i < rows; i++){
    document.getElementById('board').innerHTML +='<div class="rows"></div>';
    document.getElementsByClassName('rows')[i].setAttribute('dataX', i);
    for (let j = 0; j < column; j++) {
        document.getElementsByClassName('rows')[i].innerHTML +='<div class="column"></div>';
        let row = document.getElementsByClassName('rows');
        let col = row[i].childNodes;
        col[j].setAttribute('dataY', j);
    }
}


let step = 0;
let mas = [];

for (let i = 0; i < rows; i++) {
    mas.push([]);
}


let board = document.getElementById('board');
board.onclick = function (event) {
    let target = event.target;

    if (target.className === 'column') {

        if (step % 2 === 0) {
            target.innerHTML = 'X';
        }
        else {
            target.innerHTML = 'O';
        }
    }
    step++;

    let placeY = target.getAttribute('dataY');
    let placeX = target.parentElement.getAttribute('dataX');

    mas[placeX][placeY] = target.innerHTML;

    checkWinner('X');
    checkWinner('O');
    score();
};

function checkWinner(symb) {
    let toRight = true;
    let toLeft = true;
    for (let i = 0; i < rows; i++) {
        toRight = toRight && (mas[i][i] === symb);
        toLeft = toLeft && (mas[i][rows - 1 - i] === symb);
    }
    allert(toRight, toLeft, symb);


    for (let i = 0; i < rows; i++) {
        let checkR = true;
        let checkC = true;
        for (let j = 0; j < column; j++) {
            checkR = checkR && (mas[i][j] === symb);
            checkC = checkC && (mas[j][i] === symb);
        }
        allert(checkR, checkC, symb);
    }
}

let flagX = false;
let flagY = false;
function allert(arg1, arg2, symb) {
    if (arg1 === true || arg2 === true) {
        if (symb === 'X') {
            flagX = true;
            alert(`Победил ${player1}`);
        }
        else {
            flagY = true;
            alert(`Победил ${player2}`)
        }
    }
}


let players1Win = 0;
let players2Win = 0;

function score (){
    let win1 = document.getElementById('win1');
    let win2 = document.getElementById('win2');

    if(flagX === true){
        players1Win++;
        win1.innerHTML = players1Win;
        console.log(flagX)
    }
    if(flagY === true){
        players2Win++;
        win2.innerHTML = players2Win;
        console.log(flagY)
    }
}


let newGame = document.getElementById('newGame');
newGame.onclick = function (){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            let row = document.getElementsByClassName('rows');
            row[i].children[j].innerHTML = '';
            mas[i][j] = '';
            flagX = false;
            flagY = false;
        }
    }
    step = 0;
};






