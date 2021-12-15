const fs = require('fs');

const segmentValues = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map((line) => line.split('|')[1].trim())
let uniqueSegmentCount = 0
for(const segmentLine of segmentValues){
  const segments = segmentLine.split(' ')
  for(segment of segments){
    const length = segment.length
    if(
      length === 2 ||
      length === 3 ||
      length === 4 ||
      length === 7
      ) {
        uniqueSegmentCount++
      }
  }
}

// part one solution
console.log(uniqueSegmentCount)

const fileContents = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n')

let sum = 0

for(const line of fileContents){
  const splitLine = line.split(' | ')
  let mixedSegments = splitLine[0].split(' ').map((segment) => segment.split('').sort().join(''))
  const valuesToDecode = splitLine[1].split(' ').map((segment) => segment.split('').sort().join(''))
  
  const segments = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null
  }

  const knownSegments = {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
    '0': null
  }

  // filter out 8 - useless
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 7){
      knownSegments['8'] = element
      return false
    } else {
      return true
    }
  })

  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 2){
        knownSegments['1'] = element
        segments.c = element
        segments.f = element
        return false;
    } else {
        return true;
    }
  })

  // figure out a
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 3){
      knownSegments['7'] = element
      const seven = element.split('')
      for(let i = 0; i < seven.length; i++){
        const isInside = knownSegments['1'].includes(seven[i])
        if(!isInside){
          segments.a = seven[i]
        break
        }
      }
      return false
    } else {
      return true
    }
  })

  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 4) {
      knownSegments['4'] = element
      const four = element.split('').filter((char) => (char !== knownSegments['1'][0] && char !== knownSegments['1'][1])).join('')
      segments.b = four
      segments.d = four
      return false
    } else {
      return true
    }
  })
  // figure out g - 9
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 6){
      let uniqueCharacters = []
      const nine = element.split('')
      const knownChars = (segments.a + segments.c + segments.b)
      for(let i = 0; i < nine.length; i++){
        if(!knownChars.includes(nine[i])){
          uniqueCharacters.push(nine[i])
        }
      }
      if(uniqueCharacters.length === 1){
        segments.g = uniqueCharacters[0]
        knownSegments['9'] = element
        return false
      } else {
        return true
      }

    } else {
      return true
    }
  })

  //figure out b d
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 5){
      const unsure = segments.d.split('')
      const charsInThreeV1 = (segments.a + segments.g + segments.c + unsure[0]).split('').sort().join('')
      const charsInThreeV2 = (segments.a + segments.g + segments.c + unsure[1]).split('').sort().join('')

      if(element === charsInThreeV1){
        // we found three
        segments.d = unsure[0]
        segments.b = unsure[1]
        knownSegments['3'] = element
        return false
      }

      if(element === charsInThreeV2){
        // we found three
        segments.d = unsure[1]
        segments.b = unsure[0]
        knownSegments['3'] = element
        return false
      }

      return true
    } else {
      return true
    }
  }) 

  // figure out g
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 6) {
      let uniqueCharacters = []
      const zero = element.split('')
      const knownChars = (segments.a + segments.b + segments.g + segments.c)
      for(let i = 0; i< zero.length; i++){
        if(!knownChars.includes(zero[i])){
          uniqueCharacters.push(zero[i])
        }
      }

      if(uniqueCharacters.length === 1){
        segments.e = uniqueCharacters[0]
        knownSegments['0'] = element
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  })

  // figure out c and f
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 5){
      const unsure = segments.c.split('')
      const charsInFiveV1 = (segments.a + segments.b + segments.d + segments.g + unsure[0]).split('').sort().join('')
      const charsInFiveV2 = (segments.a + segments.b + segments.d + segments.g + unsure[1]).split('').sort().join('')

      if(element === charsInFiveV1){
        // we found five
        segments.f = unsure[0]
        segments.c = unsure[1]
        knownSegments['5'] = element
        return false
      }

      if(element === charsInFiveV2){
        segments.f = unsure[1]
        segments.c = unsure[0]
        knownSegments['5'] = element
        return false
      }

      return true
    } else {
      return true
    }
  })

  // checking if it matches 6
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 6){
      if(element === (segments.a + segments.b + segments.d + segments.e + segments.f + segments.g).split('').sort().join('')){
        knownSegments['6'] = element
        return false
      }
      return true
    } else {
      return true
    }
  })

  // checking if it matches 2
  mixedSegments = mixedSegments.filter((element) => {
    if(element.length === 5){
      if(element === (segments.a + segments.c + segments.d + segments.e + segments.g).split('').sort().join('')){
        knownSegments['2'] = element
        return false
      }
      return true
    } else {
      return true
    }
  })

  if(mixedSegments.length !== 0){
    console.log('error!')
  }

  const helperObject = {}

  for(const key in knownSegments){
    helperObject[knownSegments[key]] = key
  }

  let localSum = '';
  for(const item of valuesToDecode){
    localSum+=helperObject[item]
  }

  sum += +localSum
}

// part two result
console.log(sum)