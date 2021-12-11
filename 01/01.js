const fs = require('fs')

const file = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'})
const measurements = file.split('\n')

let increase = 0;
for(let i = 1; i < measurements.length; i++){
  if(Number(measurements[i - 1]) < Number(measurements[i])){  
    increase++;
  }
}
// part one result
console.log(increase)


let previousWindow = Number(measurements[0]) + Number(measurements[1]) + Number(measurements[2])
let increaseWindowCount = 0;

// Sliding window
for(let i = 3; i < measurements.length; i++){
  let currentWindow = Number(measurements[i]) + Number(measurements[i - 1]) + Number(measurements[i - 2])
  if(currentWindow > previousWindow){
    increaseWindowCount++;
  }
  previousWindow = currentWindow
}

// part two result
console.log(increaseWindowCount)
