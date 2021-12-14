const fs = require('fs');

const crabPositions = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split(',').map(element => +element)

const max = Math.max(...crabPositions)
let result = []

for(let i = 0; i <= max; i++) {
  let fuelCost = 0
  for(const crab of crabPositions){
    fuelCost += Math.abs(i - crab)
  }
  result.push(fuelCost)
}

// part one solution
console.log(Math.min(...result))

result = []

for(let i = 0; i <= max; i++) {
  let totalFuelCost = 0
  for(const crab of crabPositions){
    const diff = Math.abs(i - crab)
    let fuelCost = 0
    for(let i = 1; i <= diff; i++){
      fuelCost += i
    }
    totalFuelCost += fuelCost
  }
  result.push(totalFuelCost)
}

// part two solution
console.log(Math.min(...result))