const x = `<svg class="x" viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="CurrentColor" fill-rule="evenodd" stroke="#31C3BD" stroke-width="2"/></svg>`;
const o = `<svg class="o" viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="CurrentColor" stroke="#F2B137" stroke-width="2"/></svg>`;

const xTurn = `<svg viewBox="0 0 64 64" width="72" height="72" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="CurrentColor" fill-rule="evenodd"/></svg>`;
const oTurn = `<svg viewBox="0 0 64 64" width="72" height="72" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="CurrentColor"/></svg>`;


const gamerX = document.querySelector('.gamer-x');
const gamerO = document.querySelector('.gamer-o')
const options = document.querySelectorAll('.option');

const positionWinner = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6], [7, 8, 9]]


let history = {};
let numRound = 1;
let winner = '';

let tie = {
    victories: 0,
}

let playerOne =  {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: false,
}

let playerTwo = {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: false
}

let cpu = {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: false
}

const optionX = document.getElementById('x');
const optionO = document.getElementById('o');
const gameXCount = document.getElementById('gameXCount');
const tieCount = document.getElementById('tieCount');
const gameOCount = document.getElementById('gameOCount');

function optionClicked(e) {
    e.preventDefault();
    options.forEach(option => option.classList.remove('option--clicked'));
    e.currentTarget.classList.add('option--clicked');
    playerOne.choose = e.currentTarget.dataset.choose;
    if (playerOne.choose) {
        playerOne.status = true;
        playerOne.turn = true;
    }
    if (playerOne.choose === 'x') {
        gamerX.textContent = '(YOU)';
    } else {gamerO.textContent = '(YOU)';}
}

const btnVsCpu = document.getElementById('btn-vscpu');
const btnVsPlayer = document.getElementById('btn-vsplayer');
const configurationGame = document.getElementById('configuration-game');
const boardGame = document.getElementById('board');

function startGame(e) {
    const whoPlay = e.currentTarget.dataset.game;
    if (playerOne.status) {
        if (whoPlay === 'cpu') {
            cpu.status = true;
            if (playerOne.choose === 'x') cpu.choose = 'o'
            if (playerOne.choose === 'o') {
                cpu.choose = 'x';
                playerOne.turn = false;
                cpu.turn = true;
                moveCPU();
            }
            if (cpu.choose === 'o') gamerO.textContent = '(CPU)';
            if (cpu.choose === 'x') gamerX.textContent = '(CPU)';
        } else if (whoPlay === 'player') {
            playerTwo.status = true;
            if (playerOne.choose === 'x') playerTwo.choose = 'o'
            if (playerOne.choose === 'o') {
                playerTwo.choose = 'x';
                playerOne.turn = false;
                playerTwo.turn = true;
            } 
            if (playerTwo.choose === 'o') gamerO.textContent = '(PLAYER 2)';
            if (playerTwo.choose === 'x') gamerX.textContent = '(PLAYER 2)';
        }
        configurationGame.style.display = 'none';
        boardGame.style.display = 'block';
    } else {
        return
    }
    turnPlayerOrCpu()

}


options.forEach(option => option.addEventListener('click', optionClicked))
btnVsCpu.addEventListener('click', startGame);
btnVsPlayer.addEventListener('click', startGame);



const cells = document.querySelectorAll('.cell');
const numbersCell = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let cellsOptionValided = numbersCell.slice();


function removeNumber(num) {
    const index = cellsOptionValided.findIndex(number => number === num);
    cellsOptionValided.splice(index, 1);
}

const optionNow = document.querySelector('.option--now');

function turnPlayerOrCpu() {
    if (playerOne.turn) {
        if (playerOne.choose === 'x') {
            optionNow.innerHTML = xTurn;
        } else if (playerOne.choose === 'o') {
            optionNow.innerHTML = oTurn;
        }
    } else if (cpu.turn) {
        if (cpu.choose === 'x') {
            optionNow.innerHTML = xTurn;
        } else if (cpu.choose === 'o') {
            optionNow.innerHTML = oTurn;
        }
    } else if (playerTwo.turn) {
        if (playerTwo.choose === 'x') {
            optionNow.innerHTML = xTurn;
        } else if (playerTwo.choose === 'o') {
            optionNow.innerHTML = oTurn;
        }
    } 
}


function selectedCell(e) {
    const thisCell = e.currentTarget;
    const numberCell = parseInt(thisCell.dataset.number);
   
    turnPlayerOrCpu();
    if (cellsOptionValided.includes(numberCell)) {
        if (playerOne.turn) {
            playerOne.game.push(numberCell);
            removeNumber(numberCell);
            if (playerOne.game.length >=3) {
                if (isWin(playerOne.game)) {
                    winner = 'playerOne';
                    numRound++;
                    playerOne.victories++;
                    history[numRound] = winner;
                    if (playerOne.choose === 'x') {
                        gameXCount.textContent = playerOne.victories;
                    } else if (playerOne.choose === 'o') {
                        gameOCount.textContent = playerOne.victories;
                    }
                    showWin(winner);
                } else {
                    checkTie();
                }
            }
            if (playerOne.choose === 'x') {
                thisCell.dataset.option = playerOne.choose;
                thisCell.innerHTML = x;
            } else if (playerOne.choose === 'o') {
                thisCell.dataset.option = playerOne.choose;
                thisCell.innerHTML = o;
            }
            playerOne.turn = false;
            if (!playerOne.turn) {
                if (cpu.status) {
                    cpu.turn = true;
                    turnPlayerOrCpu();
    
                    moveCPU();
                    checkTie();
                }
                if (playerTwo.status) {
                    playerTwo.turn = true;
                    turnPlayerOrCpu();
                }
            }
        } else if (playerTwo.turn) {
            playerTwo.game.push(numberCell);
            removeNumber(numberCell);
            if (playerTwo.game.length >=3) {
                if (isWin(playerTwo.game)) {
                    winner = 'playerTwo';
                    numRound++;
                    playerTwo.victories++;
                    history[numRound] = winner;
                    if (playerTwo.choose === 'x') {
                        gameXCount.textContent = playerTwo.victories;
                    } else if (playerTwo.choose === 'o') {
                        gameOCount.textContent = playerTwo.victories;
                    }
                    showWin(winner);
                } else {
                    checkTie();
                }
            }
            if (playerTwo.choose === 'x') {
                thisCell.dataset.option = playerTwo.choose;
                thisCell.innerHTML = x;
            } else if (playerTwo.choose === 'o') {
                thisCell.dataset.option = playerTwo.choose;
                thisCell.innerHTML = o;
            }
            playerTwo.turn = false;
            if (!playerTwo.turn) {
                if (cpu.status) {
                    cpu.turn = true;
                    turnPlayerOrCpu();
    
                    moveCPU();
                    checkTie();
                }
                if (playerOne.status) {
                    playerOne.turn = true;
                    turnPlayerOrCpu();
                }
            }
        }
    } else {
        return
    }
}

function checkTie() {
    if (cellsOptionValided.length === 0 && winner === '') {
        winner = 'tie';
        tie.victories++;
        tieCount.textContent = tie.victories;
        showWin(winner);
    }
    actualizar();
}


function moveCPU() {
    const numberChoose = getNumberRandom(cellsOptionValided);
    cpu.game.push(numberChoose);
    const numberString = numberChoose.toString();
    cells.forEach(cell => {
        if (cell.dataset.number === numberString) {
            if (cpu.choose === 'x') {
                cell.dataset.option = cpu.choose;
                cell.innerHTML = x;
            } else if (cpu.choose === 'o') {
                cell.dataset.option = cpu.choose;
                cell.innerHTML = o;
            }

        }
        
    })
    removeNumber(numberChoose);
    cpu.turn = false;
    if (!cpu.turn) {
        playerOne.turn = true;
        turnPlayerOrCpu();
    }

    if (cpu.game.length >= 3) {
        if (isWin(cpu.game)) {
            winner = 'cpu';
            numRound++;
            cpu.victories++;
            history[numRound] = winner;
            if (cpu.choose === 'x') {
                gameXCount.textContent = cpu.victories;
            } else if (cpu.choose === 'o') {
                gameOCount.textContent = cpu.victories;
            }
            cpu.textContent = cpu.victories;
            showWin(winner);
        }
    }
    checkTie();
}


function getNumberRandom(array) {
  const indexRandom = Math.floor(Math.random() * array.length);
  return array[indexRandom];
}

cells.forEach(cell => cell.addEventListener('click', selectedCell));

function isWin(mazo) {
    const mazoSet = new Set(mazo);
    for (let combo of positionWinner) {
        if (combo.every(cell => mazoSet.has(cell))) {
            cellsWin(combo);
            return true;
        }
    }
    return false;
}



function cellsWin(mazo) {
    for (let number of mazo) {
        cells.forEach(cell => {
            if (parseInt(cell.dataset.number) === number) {
                cell.dataset.correct = 'win';
            }
        })
    }
}

const body = document.querySelector('body');
const youWon = document.getElementById('youWon');
const cellWon = youWon.querySelector('.cell--won');
const textWon = youWon.querySelector('.tiktak__win');

const youLost = document.getElementById('youLost');
const cellLost = youLost.querySelector('.cell--won');
const textLost = youLost.querySelector('.tiktak__win');

const tied = document.getElementById('tied');

function showWin(winner) {
    body.classList.add('body--finishgame');
    if (winner === 'playerOne') {
        youWon.style.display = 'flex';
        if (playerOne.choose === 'x') {
            cellWon.innerHTML = x;
            textWon.dataset.text = playerOne.choose;
        } else if (playerOne.choose === 'o') {
            cellWon.innerHTML = o;
            textWon.dataset.text = playerOne.choose;
        }
    } else if (winner === 'cpu') {
        youLost.style.display = 'flex';
        if (cpu.choose === 'x') {
            cellLost.innerHTML = x;
            textLost.dataset.text = cpu.choose
        } else if (cpu.choose === 'o')  {
            cellLost.innerHTML = o;
            textLost.dataset.text = cpu.choose
        }
    } else if (winner === 'tie') {
        tied.style.display = 'flex';
    } else if (winner === 'playerTwo') {
        youWon.style.display = 'flex';
        if (playerTwo.choose === 'x') {
            cellWon.innerHTML = x;
            textWon.dataset.text = playerTwo.choose;
        } else if (playerTwo.choose === 'o') {
            cellWon.innerHTML = o;
            textWon.dataset.text = playerTwo.choose;
        }
    }
}

const btnsNext = document.querySelectorAll('.btn-next');
const btnsQuit = document.querySelectorAll('.btn-quit');

function actualizar() {
    if (playerOne.choose === 'x') {
        gameXCount.textContent = playerOne.victories;
    } else if (playerOne.choose === 'o') {
        gameOCount.textContent = playerOne.victories;
    }
    if (cpu.choose === 'x') {
        gameXCount.textContent = cpu.victories;
    } else if (cpu.choose === 'o') {
        gameOCount.textContent = cpu.victories;
    }

    tieCount.textContent = tie.victories;
}
function nextRound(e) {
    e.preventDefault();
    body.classList.remove('body--finishgame');
    winner = '';
    youWon.style.display = 'none';
    youLost.style.display = 'none';
    tied.style.display = 'none';
    youReset.style.display = 'none';

    textWon.dataset.text = '';
    textLost.dataset.text = '';

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.dataset.option = '';
        cell.dataset.correct = '';
    })

    playerOne.game = [];
    playerOne.turn = true;
    cpu.game = [];
    cpu.turn = false;
    playerTwo.game = [];
    playerTwo.turn = false;
    actualizar();

    cellsOptionValided = numbersCell.slice();
    if (playerOne.status && cpu.status) {
        if (playerOne.choose === 'o') {
            moveCPU();
        }
    }

    if (playerOne.status && playerTwo.status) {
        if (playerOne.choose === 'o') {
            playerTwo.turn = true;
            playerOne.turn = false;
        }
    }
}

function cleanBoardCount() {
    body.classList.remove('body--finishgame');
    youWon.style.display = 'none';
    youLost.style.display = 'none';
    tied.style.display = 'none';
    youReset.style.display = 'none';
    cellsOptionValided = numbersCell.slice();
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.dataset.option = '';
        cell.dataset.correct = '';
    })

    gameXCount.textContent = '0';
    gameOCount.textContent = '0';
    tieCount.textContent = '0';

    history = {};
    numRound = 1;
    winner = '';

    tie.victories = 0;
    playerOne =  {
        status: false,
        choose: '',
        victories: 0,
        game: [],
        turn: false
    }

    playerTwo = {
        status: false,
        choose: '',
        victories: 0,
        game: [],
        turn: false
    }

    cpu = {
        status: false,
        choose: '',
        victories: 0,
        game: [],
        turn: false
    }
    options.forEach(option => option.classList.remove('option--clicked'));
    configurationGame.style.display = 'block';
    boardGame.style.display = 'none';

}

btnsNext.forEach(btnNext => btnNext.addEventListener('click', nextRound));
btnsQuit.forEach(btnQuit => btnQuit.addEventListener('click', cleanBoardCount));


const btnBack = document.querySelector('.tiktak__back');
const btnCancel = document.querySelector('.btn-cancel');
const btnReset = document.querySelector('.btn-reset');
function showReset() {
    body.classList.add('body--finishgame');
    youReset.style.display = 'flex';

}

function cancel() {
    body.classList.remove('body--finishgame');
    youReset.style.display = 'none';
}

btnBack.addEventListener('click', showReset);
btnCancel.addEventListener('click', cancel);
btnReset.addEventListener('click', cleanBoardCount);