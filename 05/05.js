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

 // console.log(map)
  // part one result
  console.log(overlapCount())
}

function visualizeOnMap({x1, x2, y1, y2}){
  // console.log(x1, x2, y1, y2)
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
   // console.log('here')
    if(x1 <= x2){
      for(let i = x1; i <= x2; i++){
        markMap(i, y1)
      }
    }
    if(x1 > x2){
   //   console.log('here too!')
      for(let i = x1; i>= x2; i--){
    //    console.log('i have to run', i, y1)
        markMap(i, y1)
      }
    }
  }
}

function visualizeDiagonalOnMap({x1, x2, y1, y2}){
  if(x1 === y1 && x2 === y2){
    console.log('f')
    if(x1 <= x2){
      for(let i = x1; i<=x2; i++){
       // console.log('mark', i, i)
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
    console.log('f')
    if(x1 <= x2){
      let index = 0
     // console.log('x1 <= x2')
      for(let i = x1; i <= x2; i++){
      //  console.log('x1 <= x2', i, y1-index)
        markMap(i, y1-index)
        index++
      }
    }
    if(x1 > x2){
      let index = 0;
     // console.log('x1 > x2')
      for(let i = x1; i >= x2; i--){
      //  console.log('x1 > x2', i, y1+index)
        markMap(i, y1+index)
        index++
      }
    }
    return
  }

  if(x1 >= x2 && y1 >= y2){
    console.log('a')
    let index = 0;
    for(let i = x1; i >= x2; i--){
      markMap(i, y1 - index)
      index++
    }
    return
  }

  if((x1 <= x2 && y1 <= y2) ||
  (x1 === y1 && x2 > y2)){
    console.log('b')
    let index = 0;
    for(let i = x1; i <= x2; i++){
      markMap(i, y1 + index)
      index++
    }
    return
  }
/*
  if(x1 === y1 && x2 > y2){
    console.log('c')
    let index = 0
    for(let i = x1; i <= x2; i++){
      markMap(i, y1 - index)
      index++
    }
    return
  }*/

  if(x1 > y1 && x2 === y2) {
    console.log('d')
    let index = 0
    for(let i = x1; i >= x2; i--){
      markMap(i, y1 + index)
      index++
    }
    return
  }

  if(x1 >= x2 && y1 <= y2){
    console.log('g')
    let index = 0
    for(let i = x1; i>=x2; i--){
      markMap(i, y1 + index)
      index++
    }
    return
  }
  if(x1 <= x2 && y1 >= y2){
    console.log('f')
    let index = 0
    for(let i = x1; i<=x2; i++){
      markMap(i, y1 - index)
      index++
    }
    return
  }
  console.log('no match', x1, y1, x2, y2)
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