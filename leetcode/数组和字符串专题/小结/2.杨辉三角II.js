/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  rowIndex = rowIndex + 1
  if(rowIndex == 0) {
    return []
  }
  if(rowIndex == 1) {
    return [1]
  }
  if(rowIndex == 2) {
    return [1,1]
  }
  let newArr = [[1], [1,1]]
  for(let i = 2; i < rowIndex; i++) {
    let arr = newArr[i-1]
    let arr2 = []
    for(let j = 0; j < arr.length - 1; j++) {
      arr2.push(arr[j] + arr[j+1])
    }
    newArr.push([1, ...arr2, 1])
  }
  return newArr[rowIndex - 1]
}

console.log(getRow(3))
