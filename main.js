let p = document.getElementById("status")
let restart = document.getElementById("restart")
let cells = document.querySelectorAll('.cell')
cells = Array.from(cells)

var click = new Audio('click.wav');
var won = new Audio('won.wav');


let currentPlayer = "X"
let gameOn = true;  // used to determine if game is finished

let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


restart.addEventListener('click', restartGame);

function restartGame(){
    currentPlayer = "X"
    gameOn = true
    cells.forEach(function(cell){
        cell.innerText = ""
        cell.classList.remove('highlight')
        cell.classList.remove('player1')
        cell.classList.remove('player2')
    })
    p.innerText = ''
}

function checkForWinner(){
    winningCombinations.forEach(function(combination){
        let check = combination.every(idx => cells[idx].innerText.trim() == currentPlayer)
        if(check){
            won.play()
            gameOn = false
            p.innerText = currentPlayer + " Has Won!"
            highlightCells(combination)
        }
    })
}

function highlightCells(combination){
    combination.forEach(function(idx){
        cells[idx].classList.add('highlight')
    })
}

cells.forEach(function(cell){
    cell.addEventListener('click', function(){
        if(cell.innerText.trim() != "" || !gameOn){
            return
        }
        click.play()
        if(currentPlayer == 'O') cell.classList.add('player2')
        if(currentPlayer == 'X') cell.classList.add('player1')
        cell.innerText = currentPlayer
        checkForWinner()
        currentPlayer = currentPlayer == "X" ? "O" : "X"
    })
})