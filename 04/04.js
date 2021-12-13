const fs = require('fs')

function main(){
  const file = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')
  
  let bingoNumbers = initBingoNumbers(file)
  
  let bingoBoards = initBingoBoards(file)

  //console.log(bingoBoards)

  let boardWon = false;
  let lastBingoNumber;
  let winnerBoardSum;
  while(!boardWon){
    lastBingoNumber = bingoNumbers.shift()
    for(const key in bingoBoards){  
      const bingoBoard = bingoBoards[key]
      markNumber(bingoBoard, String(lastBingoNumber))
      boardWon = isBoardWon(bingoBoard)
      if(boardWon) {
        winnerBoardSum = sumBoard(bingoBoard)
       break;
      }
    }
  }

  // part one solution
  console.log(winnerBoardSum * lastBingoNumber)

  bingoNumbers = initBingoNumbers(file)
  bingoBoards = initBingoBoards(file)
  let lastBoardSum

  while(Object.keys(bingoBoards).length) {
    lastBingoNumber = bingoNumbers.shift()
    for(const key in bingoBoards){  
      const bingoBoard = bingoBoards[key]
      markNumber(bingoBoard, String(lastBingoNumber))
      boardWon = isBoardWon(bingoBoard)
      if(boardWon) {
        if(Object.keys(bingoBoards).length === 1){
          lastBoardSum = sumBoard(bingoBoards[key])
        }
        delete bingoBoards[key]    
      }
    }
  }
  // part two result
  console.log(lastBingoNumber * lastBoardSum)
}

function initBingoBoards(file){
  let bingoBoards = {}
  let index = 0;
  for(let i = 2; i< file.length; i+=6){
    bingoBoards[index] = [
      file[i].trim().split(/\s+/),
      file[i + 1].trim().split(/\s+/),
      file[i + 2].trim().split(/\s+/),
      file[i + 3].trim().split(/\s+/),
      file[i + 4].trim().split(/\s+/),
    ]
    index++;
  }

  return bingoBoards
}

function initBingoNumbers(file) {
  return file[0].split(',')
}

function isBoardWon(bingoBoard){
  let len = bingoBoard.length
  for(let i = 0; i < len; i++){
    // horizontal
    if(bingoBoard[i][0] === undefined &&
      bingoBoard[i][1] === undefined &&
      bingoBoard[i][2] === undefined &&
      bingoBoard[i][3] === undefined &&
      bingoBoard[i][4] === undefined) {
        return true
    }
    // vertical
    if(bingoBoard[0][i] === undefined &&
      bingoBoard[1][i] === undefined &&
      bingoBoard[2][i] === undefined &&
      bingoBoard[3][i] === undefined &&
      bingoBoard[4][i] === undefined) {
        return true
    }
  }

  return false
}

function sumBoard(bingoBoard){
  let len = bingoBoard.length

  let sum = 0;
  const reducer = (previousValue, currentValue) => currentValue ? previousValue + Number(currentValue) : previousValue + 0
  for(let i = 0; i < len; i++){
   sum = bingoBoard[i].reduce(reducer, sum)
  }

  return sum
}

function markNumber(bingoBoard, number) {
  let len = bingoBoard.length
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len; j++){
      if(bingoBoard[i][j] === number) {
        bingoBoard[i][j] = undefined
      }
    }
  }
}

main()