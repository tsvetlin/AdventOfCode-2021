const fs = require('fs');

let pathList = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(path => path.split('-'))

// console.log(pathList)

const smallCaveList = new Set()
const uniquePaths = new Set()

const pathMap = {}
for(const path of pathList) {
  if(path[0] !== 'start' && path[0] !== 'end' && path[0] === path[0].toLowerCase()){
    smallCaveList.add(path[0])
  }

  if(path[1] !== 'start' && path[1] !== 'end' && path[1] === path[1].toLowerCase()){
    smallCaveList.add(path[1])
  }

  if(!pathMap[path[0]]){
    if(path[1] !== 'start') {
      pathMap[path[0]] = [ path[1] ]
    }
  } else {
    if(path[1] !== 'start'){
      pathMap[path[0]].push(path[1])
    }
  }
  if(!pathMap[path[1]]){
    if(path[0] !== 'start'){
      pathMap[path[1]] = [ path[0] ]
    }
  } else {
    if(path[0] !== 'start'){
      pathMap[path[1]].push(path[0])
    }
  }
}
delete pathMap.end
console.log('pathmap', pathMap)

function countPathsUtil(currentCave, targetCave, pathCount, backtrackCavePath, depth, pathUntil, smallCaveVisited, key) {
        depth++
        const localPath = { ...backtrackCavePath }
        const scv = { ...smallCaveVisited } 

        if(currentCave === key){
          if(scv[key] === false){
            scv[key] = true
          } else {
            //filter
            if(currentCave === currentCave.toLowerCase()){
              // do not visit small caves again
              for(const node in localPath){
                localPath[node] = localPath[node].filter((cave) => cave !== currentCave)
              }
            }
          }
        } else {
          if(currentCave === currentCave.toLowerCase()){
            // do not visit small caves again
            for(const node in localPath){
              localPath[node] = localPath[node].filter((cave) => cave !== currentCave)
            }
          }
        }

        if(pathUntil === ''){
          pathUntil += currentCave
        } else {
          pathUntil += `-${currentCave}`
        }
        if (currentCave == targetCave) {
            pathCount++;
            uniquePaths.add(pathUntil)
        } else {           
            const len = localPath[currentCave].length
            for(let i = 0; i < len; i++) {
                let nextCave = localPath[currentCave][i];
                pathCount = countPathsUtil(nextCave, targetCave, pathCount, localPath, depth, pathUntil, scv, key);
            }
        }
        return pathCount;
}

function countPaths(currentCave, targetCave) {
        let pathCount = 0
        const backtrackCavePath = { ...pathMap }
        const smallCaveVisited = {}
        for(const key of smallCaveList){
          smallCaveVisited[key] = false
        }
        for(let key in smallCaveVisited){
          pathCount += countPathsUtil(currentCave, targetCave, 0, backtrackCavePath, 0, '', smallCaveVisited, key)
        }
        return pathCount
}

let currentCave = 'start'
let targetCave = 'end'
//part one solution
console.log(countPaths(currentCave, targetCave))
//part two solution
console.log(uniquePaths.size)