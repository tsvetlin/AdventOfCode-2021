const fs = require('fs');

const caveMap = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(line => line.split('').map(e => +e))

const lowPoints = []
const lowPointCoords = []

for(let i = 0; i < caveMap.length; i++){
  for(let j = 0; j < caveMap[i].length; j++){
    const adjacent = []
    caveMap[i - 1] !== undefined ? adjacent.push(caveMap[i - 1][j]) : undefined
    caveMap[i][j - 1] !== undefined ? adjacent.push(caveMap[i][j - 1]) : undefined
    caveMap[i][j + 1] !== undefined ? adjacent.push(caveMap[i][j + 1]) : undefined
    caveMap[i + 1] !== undefined ? adjacent.push(caveMap[i + 1][j]) : undefined

    if(caveMap[i][j] < Math.min(...adjacent)){
      lowPoints.push(caveMap[i][j])
      lowPointCoords.push({
        x: j,
        y: i
      })
    }
  }
}

const riskFactor = lowPoints.reduce((prev, curr) => prev + curr + 1, 0)
// part one result
console.log(riskFactor)

const fill = (x, y) => {
  // console.log({x, y})
  let fillCount = 0
  if(x < 0 || x > caveMap[0].length - 1){
    return 0
  }

  if(y < 0 || y > caveMap.length - 1){
    return 0
  }

  if(caveMap[y][x] < 0 || caveMap[y][x] >= 9){
    return 0
  }
  
  caveMap[y][x] = -1
  fillCount++

  fillCount += fill(x, y - 1)
  fillCount += fill(x - 1, y)
  fillCount += fill(x + 1, y)
  fillCount += fill(x, y + 1)

  return fillCount
}

let basinSizes = []

for(const {x, y} of lowPointCoords){
  basinSizes.push(fill(x, y))
}

basinSizes.sort((a, b) => b - a )

// part two result
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])