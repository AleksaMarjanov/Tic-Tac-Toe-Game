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
// Getting each box of the grid
const boxElements = document.querySelectorAll('[data-box]')
// Gameboard as the grid of game
const gameboard = document.getElementById('gameboard')
// selector for display message in case win/lose/draw
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartBtn')
const startOver = document.getElementById('startOver')
const turn = document.querySelector('.turn')
let circleTurn

//calling function to start the game
startGame()
// clicking on Play Again button will restart game
restartButton.addEventListener('click', startGame) 

function startGame() {
    //Set to be X's Turn first
    circleTurn = false;
    // For each cell remove X & Circle
    boxElements.forEach ( box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener('click', handleClick)
        // Once cell is clicked in the grid don't allow change within that same box
        box.addEventListener('click', handleClick, {once: true})
        console.log(handleClick)
    })
    setBoardHoverClass()   
    winningMessageElement.classList.remove('show') 
}
// On click it will target box 
function handleClick(e) {
    const box = e.target
    // Whose turn it is assign it to be the current class
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
// End of game if it is draw
function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    // if it is not draw, did X or O win the game
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's": "X's"} Wins!`
    }
    // Displaying winning message
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...boxElements].every(box => {
        return box.classList.contains(X_CLASS) || 
        box.classList.contains(CIRCLE_CLASS)
    })
}
// Creating a function for placing mark on the grid
function placeMark(box, currentClass) {
    box.classList.add(currentClass)
}
// Checking whose turn it is and switching turns
function switchTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    gameboard.classList.remove(X_CLASS)
    gameboard.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        gameboard.classList.add(CIRCLE_CLASS)
        turn.textContent = "It is O's turn"
    }
    else {
        gameboard.classList.add(X_CLASS);
        turn.textContent = "It is X's turn"
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentClass)
        })
    })
}
// adding animation to the page using gsap
const tl = gsap.timeline({defaults: {ease: "power1.out"}})

tl.to('.text', {y: "0%", duration: 1, stagger: 0.25});
tl.to('.slider', {y: '-100%', duration: 1.5, delay: 0.5})
tl.to('.intro', {y: '-100%', duration: 1}, '-=1')
tl.to('.gameboard', {y: '0%', duration: 1}, '-=1')

