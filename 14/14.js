const fs = require('fs');

let recipe = fs.readFileSync('input2.txt', {encoding:'utf8', flag:'r'}).split('\n')

let formula = recipe[0]

const initTemplate = () => {
  const template = {}
  for(let i = 2; i < recipe.length; i++){
    const splitLine = recipe[i].split(' -> ')
    template[splitLine[0]] = splitLine[1]
  }
  return template
}

console.log(formula)

const main = () => {
  let formula = recipe[0]
  const template = initTemplate()
  const elementCount = {}

  for(let step = 0; step < 10; step++){
    console.log('step', step)
    let currentIndex = 0
    for(currentIndex; currentIndex < formula.length - 1; currentIndex += 2){
      const itemToInsert = template[`${formula[currentIndex]}${formula[currentIndex + 1]}`]
      let tmpArr = formula.split('')
      tmpArr.splice(currentIndex + 1, 0, itemToInsert)
      formula = tmpArr.join('')
    }
  }
  console.log(formula.length)
  for(let i = 0; i< formula.length; i++){
    if(!elementCount[formula[i]]){
      elementCount[formula[i]] = 1
    } else {
      elementCount[formula[i]]++
    }
  }
  
  console.log(elementCount)

  const arr = Object.values(elementCount)
  console.log(Math.max(...arr) - Math.min(...arr))

}

main()