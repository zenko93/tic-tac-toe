
let player1 = prompt("Введите имя игрока за крестики", 'Игрок 1');
let player2 = prompt("Введите имя игрока за нолики", 'Игрок 2');

let playerNameTd1 = document.getElementById('player1');
let playerNameTd2 = document.getElementById('player2');

playerNameTd1.innerHTML = player1;
playerNameTd2.innerHTML = player2;

alert(`Начинает ${player1} за крестики`);

for (let i=0; i < 9; i++){
    document.getElementById('board').innerHTML+='<div class="cell"></div>';
}

let board = document.getElementById('board');
let step = 0;
board.onclick = function(event) {
    let target = event.target;

    if(target.className === 'cell') {

        if(step % 2 === 0){
            target.innerHTML = 'X';
        }
        else {
            target.innerHTML = 'O';
        }
        step ++;
    }
    checkWinner();
};

let cells = document.getElementsByClassName('cell');
let win1 = document.getElementById('win1');
let win2 = document.getElementById('win2');

let players1Win = 0;
let players2Win = 0;
function checkWinner() {
    //крестики победили
    if(cells[0].innerHTML === 'X' && cells[1].innerHTML === 'X' && cells[2].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[3].innerHTML === 'X' && cells[4].innerHTML === 'X' && cells[5].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[6].innerHTML === 'X' && cells[7].innerHTML === 'X' && cells[8].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[0].innerHTML === 'X' && cells[3].innerHTML === 'X' && cells[6].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[1].innerHTML === 'X' && cells[4].innerHTML === 'X' && cells[7].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[2].innerHTML === 'X' && cells[5].innerHTML === 'X' && cells[8].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[0].innerHTML === 'X' && cells[4].innerHTML === 'X' && cells[8].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    if(cells[2].innerHTML === 'X' && cells[4].innerHTML === 'X' && cells[6].innerHTML === 'X') {players1Win += 1; win1.innerHTML = players1Win; alert(`Крестики победили! Победитель ${player1}`)};
    //нолики победили
    if(cells[0].innerHTML === 'O' && cells[1].innerHTML === 'O' && cells[2].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[3].innerHTML === 'O' && cells[4].innerHTML === 'O' && cells[5].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[6].innerHTML === 'O' && cells[7].innerHTML === 'O' && cells[8].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[0].innerHTML === 'O' && cells[3].innerHTML === 'O' && cells[6].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[1].innerHTML === 'O' && cells[4].innerHTML === 'O' && cells[7].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[2].innerHTML === 'O' && cells[5].innerHTML === 'O' && cells[8].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[0].innerHTML === 'O' && cells[4].innerHTML === 'O' && cells[8].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
    if(cells[2].innerHTML === 'O' && cells[4].innerHTML === 'O' && cells[6].innerHTML === 'O') {players2Win += 1; win2.innerHTML = players2Win; alert(`Нолики победили! Победитель ${player2}`)};
}


let newGame = document.getElementById('newGame');
newGame.onclick = function (){
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    step = 0;
};







