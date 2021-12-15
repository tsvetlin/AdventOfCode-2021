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
  //  console.log('error', erroneusChar)
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
   //   console.log('incomplete')
  } else {
   // console.log('complete')
  }

}

console.log(errorSum)
