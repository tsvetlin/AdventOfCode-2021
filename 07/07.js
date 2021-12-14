const fs = require('fs');

const crabPositions = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split(',').map(element => +element)

const max = Math.max(...crabPositions)
const result = []

for(let i = 0; i <= max; i++) {
  let fuelCost = 0
  for(const crab of crabPositions){
    fuelCost += Math.abs(i - crab)
  }
  result.push(fuelCost)
}

// part one solution
console.log(Math.min(...result))