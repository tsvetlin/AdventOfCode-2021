const fs = require('fs');

let dumboCave = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(line => line.split('').map(e => +e))
//console.log(dumboCave)
let flashCount = 0;

const increaseValue = () => {

  for(let y = 0; y < dumboCave.length; y++){
    for(let x = 0; x < dumboCave[y].length; x++){
      dumboCave[y][x]++
    }
  }

 // console.log(dumboCave)
}

const whosAGoodBoy = () => {

  const arrayOfNine = []
  for(let y = 0; y < dumboCave.length; y++){
    for(let x = 0; x < dumboCave[y].length; x++){
      if(dumboCave[y][x] > 9) {
        arrayOfNine.push({x, y})
      }
    }
  }
  return arrayOfNine
}

const flash = ({ x, y }) => {
  flashCount++
  dumboCave[y][x] = 0
  if(dumboCave[y - 1]){
    // evaulates false if dumbo is 0
    if(dumboCave[y - 1][x - 1]){
      dumboCave[y - 1][x - 1]++
    }
    if(dumboCave[y - 1][x]){
      dumboCave[y - 1][x]++
    }
    if(dumboCave[y - 1][x + 1]){
      dumboCave[y - 1][x + 1]++
    }
  }

  if(dumboCave[y][x - 1]){
    dumboCave[y][x - 1]++
  }

  if(dumboCave[y][x + 1]){
    dumboCave[y][x + 1]++
  }

  if(dumboCave[y + 1]){
    // evaulates false if dumbo is 0
    if(dumboCave[y + 1][x - 1]){
      dumboCave[y + 1][x - 1]++
    }
    if(dumboCave[y + 1][x]){
      dumboCave[y + 1][x]++
    }
    if(dumboCave[y + 1][x + 1]){
      dumboCave[y + 1][x + 1]++
    }
  }
}

const areDumbosSynchronized = () => {
  let areThey = true
  for(let y = 0; y < dumboCave.length; y++){
    for(let x = 0; x < dumboCave[y].length; x++){
      if(dumboCave[y][x] !== 0){
        areThey = false
      }
    }
  }

  return areThey
}

const dumboDay = () => {
  increaseValue()
  let arrayOfNine = whosAGoodBoy()
  while(arrayOfNine.length){
    for(const pos of arrayOfNine){
      flash(pos)
    }
    arrayOfNine = whosAGoodBoy()
  }
}

const main = () => {
  const maxSteps = 100;
  for(let step = 0; step < maxSteps; step++){
    dumboDay()
   // console.log(`Day ${step + 1}: `,dumboCave)
  }
  // part one result
  console.log(flashCount)

  dumboCave = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(line => line.split('').map(e => +e))
  let firstSyncStep = 0
  while(!areDumbosSynchronized()){
    dumboDay()
    firstSyncStep++
  }
  console.log(firstSyncStep)
}

main()