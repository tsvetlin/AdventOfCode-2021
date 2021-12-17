const fs = require('fs');

let transparentPaper = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')

let dotCoordinates = []
let foldCoordinates = []

let maxX = 0
let maxY = 0

let paper = []

const parseFile = () => {
  transparentPaper.map(line => {
    if(line.includes('fold along')){
      // fold part
     const splitLine = line.split('fold along ').pop().split('=')
     foldCoordinates.push({
       axis: splitLine[0],
       value : +splitLine[1]
    })
    } else {
      if(line){
        const splitLine = line.split(',')
        const x = +splitLine[0]
        const y = +splitLine[1]

        if(x > maxX){
          maxX = x
        }

        if(y > maxY) {
          maxY = y
        }
        dotCoordinates.push({
          x,
          y,
        })
      }
    } 
  })
}

const initPaper = () => {
  const tmpPaper = []
  for(let i = 0; i <= maxY; i++){
    tmpPaper.push(new Array(maxX + 1).fill(0))
  }
  return tmpPaper
}

const populatePaper = ({ x, y }) => {
  paper[y][x] = 1
}

const fold = ({ axis, value }) => {
  let tmpPaper = []
  if(axis === 'y'){
    maxY = value - 1
    tmpPaper = initPaper()
    // horizontal fold
    for(let y = 0; y < paper.length; y++){ 
      for(let x = 0; x < paper[y].length; x++){
        if(y < value){
          // above the fold simple copy
          tmpPaper[y][x] = paper[y][x]
        } else if(y > value) {
          // below the fold copy if value is 1
          if(paper[y][x] === 1){ 
            tmpPaper[value - (y - value)][x] = paper[y][x]
          }
        }
      }
    }
  } else {
    // vertical fold
    maxX = value - 1
    tmpPaper = initPaper()
    for(let y = 0; y < paper.length; y++){
      for(let x = 0; x < paper[y].length; x++){
        if(x < value){
          // before the fold simple copy
          tmpPaper[y][x] = paper[y][x]
        } else if(x > value){
          if(paper[y][x] === 1){
            tmpPaper[y][value - (x - value)] = paper[y][x]
          }
        }
      }
    }
  }
  paper = tmpPaper
}

const countDots = () => {
  let count = 0;
  const reducer = (a, b) => a + b
  for(let i = 0; i < paper.length; i++){
    count += paper[i].reduce(reducer, 0)
  }
  return count
}

const main = () => {
  parseFile()
  maxX += 1

  paper = initPaper();

  for(let i = 0; i < dotCoordinates.length; i++){
    populatePaper(dotCoordinates[i])
  }
  for( let i = 0; i< foldCoordinates.length; i++){
    fold(foldCoordinates[i])
  }

  const dots = countDots()
  console.log(dots)
  console.log('paper', paper)
}

main()