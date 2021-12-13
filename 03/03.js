const fs = require('fs')

const file = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'})
const diagnosticReport = file.split('\n')

const zeroesCount = {}

diagnosticReport.forEach((diagnose) => {
  diagnose.split('').forEach((bit, index) => {
    if(bit === '0'){
      if(!zeroesCount[index]){
        zeroesCount[index] = 1
      } else {
        zeroesCount[index]++
      }
    }
  })
})

let gammaRateBinary = ''
let epsilonRateBinary = ''
for(const bitCount in zeroesCount) {
  if(zeroesCount[bitCount] > diagnosticReport.length / 2){
    gammaRateBinary = gammaRateBinary.concat('0')
    epsilonRateBinary = epsilonRateBinary.concat('1')
  } else {
    gammaRateBinary =gammaRateBinary.concat('1')
    epsilonRateBinary = epsilonRateBinary.concat('0')
  }
}

const gammaRate = parseInt(gammaRateBinary, 2)
const epsilonRate = parseInt(epsilonRateBinary, 2)

// part one result
console.log(gammaRate * epsilonRate)

const reportContainer = []
diagnosticReport.forEach((diagnose) => {
    reportContainer.push(diagnose.split(''))
})

const diagnosticLength = reportContainer[0].length

let availableOptions = [...reportContainer]
let index = 0

// find MSB
while(availableOptions.length !== 1){
  let zeroCount = 0;
  let zero = []
  let one = []
  for(let i = 0; i< availableOptions.length; i++){
    if(availableOptions[i][index] === '0'){
      zeroCount++
      zero.push(availableOptions[i])
    } else {
      one.push(availableOptions[i])
    }
  }
  index++
  if(zeroCount > availableOptions.length / 2){
    availableOptions = [...zero]
  } else {
    availableOptions = [...one]
  }
}

const oxigenGeneratorRating = parseInt(availableOptions[0].join(''), 2)

availableOptions = [...reportContainer]
index = 0

// find LSB
while(availableOptions.length !== 1){
  let zeroCount = 0;
  let zero = []
  let one = []
  for(let i = 0; i < availableOptions.length; i++){
    if(availableOptions[i][index] === '0'){
      zeroCount++
      zero.push(availableOptions[i])
    } else {
      one.push(availableOptions[i])
    }
  }

  index++
  if(zeroCount <= availableOptions.length / 2){
    availableOptions = [...zero]
  } else {
    availableOptions = [...one]
  }
}

const co2scrubbingRating = parseInt(availableOptions[0].join(''), 2)

console.log(oxigenGeneratorRating * co2scrubbingRating)


// 1927 3654 7041258