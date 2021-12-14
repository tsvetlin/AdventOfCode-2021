const fs = require('fs');

function main(){
  const school = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split(',').map(element => +element)
  //const school = [3,4,3,1,2]
  for(let day = 1; day <=80; day++){
    let born = 0
    for(let i = 0; i< school.length; i++){
      if(school[i] === 0){
        school[i] = 6;
        born++

      } else {
        school[i]--
      }
    }
    for(let i = 0; i< born; i++){
      school.push(8)
    }
  // console.log(`Day: ${day} ${school}`)
  }

console.log(school.length)
}

main()