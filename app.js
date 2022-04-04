const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const boxElements = document.querySelectorAll('[data-box]')
const gameboard = document.getElementById('gameboard')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartBtn')
let circleTurn


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    boxElements.forEach ( box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()   
    winningMessageElement.classList.remove('show') 
}

function handleClick(e) {
    const box = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // console.log('We clicked')
    // Place mark
    placeMark(box, currentClass)
    // Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    // Check for draw
    else if(isDraw()) {
        endGame(true)
    }
    else {
    // Switch turns
    switchTurns()
    setBoardHoverClass()
    }

}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's": "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...boxElements].every(box => {
        return box.classList.contains(X_CLASS) || 
        box.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass)
}

function switchTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    gameboard.classList.remove(X_CLASS)
    gameboard.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        gameboard.classList.add(CIRCLE_CLASS)
    }
    else {
        gameboard.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentClass)
        })
    })
}