const fs = require('fs');

const map = []

function main(){
  const file = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')

  const nondiagonalLines = []
  const diagonalLines = []
  for(const ventLine of file){
    const ventCoords = ventLine.split(' -> ')
    const start = ventCoords[0].split(',')
    const end = ventCoords[1].split(',')
    if(start[0] === end[0] ||
      start[1] === end[1]){
        const vent = {
          x1: +start[0],
          x2: +end[0],
          y1: +start[1],
          y2: +end[1]
        }
        nondiagonalLines.push(vent)
        visualizeOnMap(vent)
      } else {
        // line is diagonal 
        // only 45 deg line
        if(
          (start[0] === start[1] && end[0] === end[1]) ||
          (start[0] === end[1] && start[1] === end[0]) ||
          (Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1]))
          ){
            const vent = {
              x1: +start[0],
              x2: +end[0],
              y1: +start[1],
              y2: +end[1]
            }
            diagonalLines.push(vent)
            visualizeDiagonalOnMap(vent)
        }
      }
  }
  // part one/two result
  console.log(overlapCount())
}

function visualizeOnMap({x1, x2, y1, y2}){
  if(x1 === x2) {
    if(y1 <= y2){
      for(let i = y1; i <= y2; i++){
        markMap(x1, i)
      }
    }
    if(y1 > y2){
      for(let i = y1; i >= y2; i--){
        markMap(x1, i)
      }
    }
  }

  if(y1 === y2){
    if(x1 <= x2){
      for(let i = x1; i <= x2; i++){
        markMap(i, y1)
      }
    }
    if(x1 > x2){
      for(let i = x1; i>= x2; i--){
        markMap(i, y1)
      }
    }
  }
}

function visualizeDiagonalOnMap({x1, x2, y1, y2}){
  if(x1 === y1 && x2 === y2){
    if(x1 <= x2){
      for(let i = x1; i<=x2; i++){
        markMap(i, i)
      }
    }
    if(x1 > x2){
      for(let i = x1; i >= x2; i--){
        markMap(i,i)
      }
    }
    return
  }
  if(x1 === y2 && y1 === x2){
    if(x1 <= x2){
      let index = 0
      for(let i = x1; i <= x2; i++){
        markMap(i, y1-index)
        index++
      }
    }
    if(x1 > x2){
      let index = 0;
      for(let i = x1; i >= x2; i--){
        markMap(i, y1+index)
        index++
      }
    }
    return
  }

  if(
    (x1 >= x2 && y1 >= y2) ||
    (x1 > y1 && x2 === y2)
    ){
    let index = 0;
    for(let i = x1; i >= x2; i--){
      markMap(i, y1 - index)
      index++
    }
    return
  }

  if(
    (x1 <= x2 && y1 <= y2) ||
    (x1 === y1 && x2 > y2)
    ){
    let index = 0;
    for(let i = x1; i <= x2; i++){
      markMap(i, y1 + index)
      index++
    }
    return
  }

  if(x1 >= x2 && y1 <= y2){
    let index = 0
    for(let i = x1; i>=x2; i--){
      markMap(i, y1 + index)
      index++
    }
    return
  }

  if(x1 <= x2 && y1 >= y2){
    let index = 0
    for(let i = x1; i<=x2; i++){
      markMap(i, y1 - index)
      index++
    }
    return
  }
}

function markMap(x, y){
  //console.log('mark!', x, y)
  if(!map[y]){
    map[y] = []
  }
  map[y][x] === undefined ? map[y][x] = 1 : map[y][x]++
}

function overlapCount(){
  let count = 0
  for(let i = 0; i < map.length; i++){
   // console.log('ck', map[i] ? map[i].length : 0)
    const len = map[i] ? map[i].length : 0
    for(let j = 0; j < len; j++){
//      console.log('bb', map[i][j])
      if(map[i][j] > 1){
       // console.log('aa', map[i][j])
        count++
      }
    }
  }

  return count
}

main()