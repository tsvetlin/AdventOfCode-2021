const fs = require('fs');

//let fishCount = 0

function main(){
  const school = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split(',').map(element => +element)
  //const school = [3,4,3,1,2]
  const days = 256
  const cycle = 7
//5934 80 days
//26 18 days
  console.log('Here', days, cycle)
  const one = kids(1, days, cycle) + 1
  console.log('one', one)
  const two = kids(2, days, cycle) + 1
  console.log('two', two)
  const three = kids(3, days, cycle) + 1
  console.log('three', three)
  const four = kids(4, days, cycle) + 1
  console.log('four', four)
  const five = kids(5, days, cycle) + 1
  console.log('five', five)

 /* const result = {
     one,
     two,
     three, 
     four,
     five
  } */

  const sum = [one, two, three, four, five]
//  console.log(result)

  let result = 0
  for(let i = 0; i < school.length; i++){
  // console.log(school[i], sum[school[i] -1])
    result += sum[school[i] - 1]
  }
  console.log(result)
}

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
  //console.log('FF', fishCount)
  if(bornOnDay.length){
//    console.log(bornOnDay)
    for(let i = 0; i < bornOnDay.length; i++){
      fishCount += kids(8 + 1, bornOnDay[i], cycle)
    }

}
  return fishCount
}

main()