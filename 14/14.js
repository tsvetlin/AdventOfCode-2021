const fs = require('fs');

let recipe = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')

let formula = recipe[0]
let occurences = {}
let characterCount = {}

const initTemplate = () => {
  const template = {}
  for(let i = 2; i < recipe.length; i++){
    const splitLine = recipe[i].split(' -> ')
    template[splitLine[0]] = splitLine[1]
    occurences[splitLine[0]] = 0
  }
  return template
}

console.log(formula)

const main = () => {
  let formula = recipe[0]
  const template = initTemplate()

  for(let i = 0; i < formula.length; i++){
      const char = formula[i]
    if(formula[i + 1] !== undefined){
      const polymer = `${formula[i]}${formula[i + 1]}`
      occurences[polymer] = occurences[polymer] ? occurences[polymer] + 1 : 1
    }
    characterCount[char] = characterCount[char] ? characterCount[char] + 1 : 1
  }
  
  for(let step = 0; step < 40; step++){
    // console.log(step)
    const tmpObj = {...occurences}
    const tmpChars = { ...characterCount}
    for(const key in occurences){
        const count = occurences[key]
        // this occurence gets removed
        const newChar = template[key]
        tmpChars[newChar] = tmpChars[newChar] ? tmpChars[newChar] + count : count
        tmpObj[key] -= count
        const pair1 = `${key[0]}${newChar}`
        const pair2 =  `${newChar}${key[1]}`
        tmpObj[pair1] += count
        tmpObj[pair2] += count
    }
    occurences = tmpObj
    characterCount = tmpChars
  }

  const arr = Object.values(characterCount)
  console.log(Math.max(...arr) - Math.min(...arr))
}

main()