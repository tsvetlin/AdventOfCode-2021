const fs = require('fs');

const segmentValues = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map((line) => line.split('|')[1].trim())
//console.log(segmentValues)
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