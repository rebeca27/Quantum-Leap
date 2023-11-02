let currentPlayer = 'player1';
const pieces = {
    player1: '🔴',
    player2: '🔵'
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const boardSize = 8;
    let boardState = createBoardState(boardSize);

    function createBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => makeMove(i));
            gameBoard.appendChild(cell);
        }
    }

    function createBoardState(size) {
        return new Array(size).fill(null).map(() => new Array(size).fill(null));
    }

    function makeMove(index) {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        if (!boardState[row][col]) {
            let potentialStates = [
                pieces[currentPlayer],
                pieces[currentPlayer] 
            ];
            boardState[row][col] = {
                player: currentPlayer,
                states: potentialStates
            };
            updateBoardVisual(row, col);
            setTimeout(() => {
                quantumCollapse(row, col);
                if (checkWinner()) {
                    alert(`${currentPlayer} wins!`);
                } else {
                    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                }
            }, 500);
        }
    }
    
    function updateBoardVisual(row, col) {
        const cellIndex = row * boardSize + col;
        const cell = gameBoard.children[cellIndex];
        cell.innerHTML = '';
        const piece = document.createElement('div');
        piece.className = `piece ${boardState[row][col].player}`;
        piece.textContent = boardState[row][col].states[0];
        cell.appendChild(piece);
    }
    
    function quantumCollapse(row, col) {
        const collapsedStateIndex = getRandomInt(2);
        const collapsedState = boardState[row][col].states[collapsedStateIndex];
        boardState[row][col] = {
            player: currentPlayer,
            states: [collapsedState]
        };
        updateBoardVisual(row, col);
    }

function checkWinner() {
    for (let i = 0; i < boardSize; i++) {
        if (checkRow(i) || checkColumn(i)) {
            return true;
        }
    }
    return checkDiagonals();
}

function checkRow(row) {
    let firstState = boardState[row][0]?.states[0];
    if (!firstState) return false;
    for (let col = 1; col < boardSize; col++) {
        if (boardState[row][col]?.states[0] !== firstState) {
            return false;
        }
    }
    return true;
}

function checkColumn(col) {
    let firstState = boardState[0][col]?.states[0];
    if (!firstState) return false;
    for (let row = 1; row < boardSize; row++) {
        if (boardState[row][col]?.states[0] !== firstState) {
            return false;
        }
    }
    return true;
}

function checkDiagonals() {
    let firstState = boardState[0][0]?.states[0];
    if (firstState) {
        let win = true;
        for (let i = 1; i < boardSize; i++) {
            if (boardState[i][i]?.states[0] !== firstState) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    firstState = boardState[0][boardSize - 1]?.states[0];
    if (firstState) {
        let win = true;
        for (let i = 1; i < boardSize; i++) {
            if (boardState[i][boardSize - 1 - i]?.states[0] !== firstState) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    return false;
}
    createBoard();
});
