const fs = require('fs');

let pathList = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(path => path.split('-'))

// console.log(pathList)

const pathMap = {}
for(const path of pathList) {
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

function countPathsUtil(currentCave, targetCave, pathCount, backtrackCavePath, depth, pathUntil) {
        depth++
        const localPath = { ...backtrackCavePath }

        if(currentCave === currentCave.toLowerCase()){
          // do not visit small caves again
          //console.log('filtering', currentCave)
          for(const node in localPath){
            localPath[node] = localPath[node].filter((cave) => cave !== currentCave)
          }
        }

        //console.log('L', depth, currentCave, localPath)
        if(pathUntil === ''){
          pathUntil += currentCave
        } else {
          pathUntil += `-${currentCave}`
        }
        if (currentCave == targetCave) {
            pathCount++;
            console.log('target reached!', pathCount, pathUntil)
        } else {      
          if(depth === 4){
           // console.log('!!!', localPath[currentCave])
          }     
            const len = localPath[currentCave].length
            for(let i = 0; i < len; i++) {
                let nextCave = localPath[currentCave][i];
               // console.log('next', depth, nextCave)
                /*if(nextCave === nextCave.toLowerCase()){
                  // do not visit small caves again
                  console.log('filtering', nextCave)
                  for(const node in localPath){
                    localPath[node] = localPath[node].filter((cave) => cave !== nextCave)
                  }
                }*/
                pathCount = countPathsUtil(nextCave, targetCave, pathCount, localPath, depth, pathUntil);
            }
        }
        return pathCount;
}

function countPaths(currentCave, targetCave) {
        let pathCount = 0
        const backtrackCavePath = { ...pathMap }
        pathCount = countPathsUtil(currentCave, targetCave, pathCount, backtrackCavePath, 0, '')
        return pathCount
}

let currentCave = 'start'
let targetCave = 'end'
//part one solution
console.log(countPaths(currentCave, targetCave))