const x = `<svg class="x" viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="CurrentColor" fill-rule="evenodd" stroke="#31C3BD" stroke-width="2"/></svg>`;
const o = `<svg class="o" viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="CurrentColor" stroke="#F2B137" stroke-width="2"/></svg>`;

const options = document.querySelectorAll('.option');

const positionWinner = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6], [7, 8, 9]]

const playerOne =  {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: true
}

const playerTwo = {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: false
}

const cpu = {
    status: false,
    choose: '',
    victories: 0,
    game: [],
    turn: false
}

const optionX = document.getElementById('x');
const optionO = document.getElementById('o');


function optionClicked(e) {
    e.preventDefault();
    options.forEach(option => option.classList.remove('option--clicked'));
    e.currentTarget.classList.add('option--clicked');
    playerOne.choose = e.currentTarget.dataset.choose;
    if (playerOne.choose) {
        playerOne.status = true;
        playerOne.turn = true;
    }
    console.log(`Configuration first Player: ${JSON.stringify(playerOne)}`);
    console.log(playerOne);
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
            if (playerOne.choose === 'o') cpu.choose = 'x';
            // console.log(`Configuration CPU: ${JSON.stringify(cpu)}`);
        } else if (whoPlay === 'player') {
            playerTwo.status = true;
            if (playerOne.choose === 'x') playerTwo.choose = 'o'
            if (playerOne.choose === 'o') playerTwo.choose = 'x';
            // console.log(`Configuration second Player: ${JSON.stringify(playerTwo)}`);
        }
        configurationGame.style.display = 'none';
        boardGame.style.display = 'block';

    } else {
        console.log('Remember choose one option to start the game!');
        return
    }

}


options.forEach(option => option.addEventListener('click', optionClicked))
btnVsCpu.addEventListener('click', startGame);
btnVsPlayer.addEventListener('click', startGame);



const cells = document.querySelectorAll('.cell');
const numbersCell = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cellsOptionValided = numbersCell.slice();


function removeNumber(num) {
    const index = cellsOptionValided.findIndex(number => number === num);
    cellsOptionValided.splice(index, 1);
}


function selectedCell(e) {
    const thisCell = e.currentTarget;
    const numberCell = parseInt(thisCell.dataset.number);
    if (!playerOne.turn) {
        console.log('Wait your turn!');
        return
    } 

    if (cellsOptionValided.includes(numberCell)) {
        playerOne.game.push(numberCell);
        removeNumber(numberCell);
        console.log(`Options valided ${cellsOptionValided}`);
        
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
                moveCPU();
            }
            if (playerTwo.status) {
                playerTwo.turn = true;
                movePlayerTwo();
            }
        }
    } else {
        console.log('This cell is already in use, choose another');
        return
    }
    console.log(`Configuration first Player: ${JSON.stringify(playerOne)}`);
}

function moveCPU() {
    const numberChoose = getNumberRandom(cellsOptionValided);
    cells.forEach(cell => {
        if (cell.dataset.number === numberChoose.toString()) {
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
    console.log(cellsOptionValided);
    cpu.turn = false;
    if (playerOne.status) {
        playerOne.turn = true;
    }
    if (playerTwo.status) {
        playerTwo.turn = true;
    }
}

function movePlayerTwo() {
}

function getNumberRandom(array) {
  const indexRandom = Math.floor(Math.random() * array.length);
  return array[indexRandom];
}







cells.forEach(cell => cell.addEventListener('click', selectedCell));

