const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const player1ScoreElem = document.getElementById('player1Score');
const player2ScoreElem = document.getElementById('player2Score');
const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
const playerVsComputerBtn = document.getElementById('playerVsComputerBtn');


let currentPlayer = 'X';
let gameBoardState = Array(9).fill(null);
let gameActive = true;
let player1Score = 0;
let player2Score = 0;
let gameMode = 'playerVsPlayer';


function createBoard() {
    gameBoard.innerHTML = '';
    gameBoardState = Array(9).fill(null);
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}


function handleCellClick(e) {
    const cellIndex = e.target.dataset.index;
    
    if (gameBoardState[cellIndex] || !gameActive) return;

    gameBoardState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        updateScore();
        gameActive = false;
    } else if (gameBoardState.every(cell => cell !== null)) {
        gameStatus.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        
        if (gameMode === 'playerVsComputer' && currentPlayer === 'O') {
            computerMove();
        }
    }
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
    ];
    
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c];
    });
}


function highlightWinningCells() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];
    
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
            document.querySelectorAll('.cell')[a].classList.add('winning');
            document.querySelectorAll('.cell')[b].classList.add('winning');
            document.querySelectorAll('.cell')[c].classList.add('winning');
        }
    });
}


function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        player1ScoreElem.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreElem.textContent = player2Score;
    }
    restartButton.style.display = 'block';
}


function computerMove() {
    const emptyCells = gameBoardState.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoardState[randomIndex] = 'O';
    document.querySelectorAll('.cell')[randomIndex].textContent = 'O';
    
    if (checkWinner()) {
        gameStatus.textContent = 'Player O wins!';
        highlightWinningCells();
        updateScore();
        gameActive = false;
    } else if (gameBoardState.every(cell => cell !== null)) {
        gameStatus.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}


function restartGame() {
    createBoard();
    restartButton.style.display = 'none';
}


playerVsPlayerBtn.addEventListener('click', () => {
    gameMode = 'playerVsPlayer';
    createBoard();
});

playerVsComputerBtn.addEventListener('click', () => {
    gameMode = 'playerVsComputer';
    createBoard();
});


createBoard();
restartButton.addEventListener('click', restartGame);
