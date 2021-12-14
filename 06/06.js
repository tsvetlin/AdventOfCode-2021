const fs = require('fs');

function main(){
  const school = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split(',').map(element => +element)
  //const school = [3,4,3,1,2]
  const days = 256
  const cycle = 7
  //5934 80 days
  //26 18 days
  const sum = []
  for(let i = 1; i <= Math.max(...school); i++) {
    sum.push(kids(i, days, cycle))
  }

  let result = 0
  for(let i = 0; i < school.length; i++){
    result += sum[school[i] - 1]
  }

  // part two result
  console.log(result)
  

// Math.ceil((currentDay - initialAge) / cycle)
const kids = (initialAge, currentDay, cycle) => {
  let fishCount = 0
  let day = currentDay - initialAge
  const bornOnDay = []
  while(day > 0){
    bornOnDay.push(day)
    day -= cycle
  }
  fishCount += bornOnDay.length
  if(bornOnDay.length){
    for(let i = 0; i < bornOnDay.length; i++){
      fishCount += kids(8 + 1, bornOnDay[i], cycle)
    }
  }
  return fishCount
}

main()