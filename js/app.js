const cells = document.querySelectorAll(".sqr")
const statusText = document.querySelector("#message")
const restartBtn = document.querySelector("#resetBtn")
const scoreResetBtn = document.querySelector('#scoreResetBtn')

const xElement = document.querySelector('#xElement')
const oElement = document.querySelector('#oElement')

let xCounter = 0
let oCounter = 0

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame)
    scoreResetBtn.addEventListener("click", scoreReset)
    statusText.textContent = `${currentPlayer}'s turn`
    running = true
}

function cellClicked(){
    const cellIndex = this.getAttribute('id')
    
    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    console.log(options)
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){

  if (currentPlayer == "X") {
    currentPlayer = "O"
  } else {
    currentPlayer = "X"
  }
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
    let roundWon = false

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        
        if (currentPlayer == 'X'){
          xElement.textContent = ++xCounter

        }else if (currentPlayer == 'O'){
          oElement.textContent = ++oCounter
        }
 
        running = false;

    } else if(!options.includes("")){
        statusText.textContent = `Draw!`
        running = false
    } 
    else{
        changePlayer()
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
}

function scoreReset(){
  xCounter = 0
  oCounter = 0

  xElement.textContent = xCounter
  oElement.textContent = oCounter
}