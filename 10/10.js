const fs = require('fs');

const chunks = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')

/*
[ 91
] 93
( 40
) 41
< 60
> 62
{ 123
} 125
*/
let errorSum = 0
let autocorrectValues = []

for(const chunk of chunks){
  let erroneusChar
  const prev = [chunk[0].charCodeAt(0)]
  for(let i = 1; i< chunk.length; i++){
    const code = chunk[i].charCodeAt(0)
    const last = prev[prev.length - 1]

    if(code === 40 || code === 91 || code === 60 || code === 123){
      prev.push(code)
    } else if(code === 41 && code === last + 1){
      prev.pop()
    } else if( code === last +2){
      prev.pop()
    } else {
      erroneusChar = code
      break
    }
  }

  if(erroneusChar){
    if(erroneusChar === 41){
      errorSum += 3
    }
    if(erroneusChar === 93) {
      errorSum += 57
    }
    if(erroneusChar === 125){
      errorSum += 1197
    }
    if(erroneusChar === 62){
      errorSum += 25137
    }
  } else if(prev.length){
    const chars = prev.map((n) => String.fromCharCode(n))
    let localAutoCorrectSum = 0
    for(let i = prev.length - 1; i >= 0; i--){
      localAutoCorrectSum *=5

      if(prev[i] === 40){
        localAutoCorrectSum += 1
      }

      if(prev[i] === 91) {
        localAutoCorrectSum += 2
      }

      if(prev[i] === 123) {
        localAutoCorrectSum += 3
      }

      if(prev[i] === 60) {
        localAutoCorrectSum += 4
      } 
    }
    autocorrectValues.push(localAutoCorrectSum)
  } else {
   // console.log('complete')
  }

}
// part one result
console.log(errorSum)

autocorrectValues.sort((a, b) => b - a )
// part two result
console.log(autocorrectValues[(autocorrectValues.length - 1) / 2])
