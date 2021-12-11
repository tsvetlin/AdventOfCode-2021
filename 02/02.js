const fs = require('fs')

const file = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'})
const directions = file.split('\n')
const directionsObject = {
  'forward': 0,
  'up': 0,
  'down': 0,
}

directions.forEach(dir => {
  const parsedDirection = dir.split(' ');
  directionsObject[parsedDirection[0]] += Number(parsedDirection[1])
})

const result = (directionsObject.down - directionsObject.up) * directionsObject.forward
// part one result
console.log(result)

const aimDirectionObject = {
  aim: 0,
  depth: 0,
  horizontal: 0
}

directions.forEach(dir => {
  const parsedDirection = dir.split(' ');
  if(parsedDirection[0] === 'forward'){
    aimDirectionObject.horizontal += Number(parsedDirection[1])
    aimDirectionObject.depth += aimDirectionObject.aim * Number(parsedDirection[1])
  }

  if(parsedDirection[0] === 'up'){
    aimDirectionObject.aim -= Number(parsedDirection[1])
  }

  if(parsedDirection[0] === 'down'){
    aimDirectionObject.aim += Number(parsedDirection[1])
  }
})

console.log(aimDirectionObject)
// part two result
console.log(aimDirectionObject.depth * aimDirectionObject.horizontal)