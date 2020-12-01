/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if(numRows == 0) {
    return []
  }
  if(numRows == 1) {
    return [[1]]
  }
  if(numRows == 2) {
    return [[1], [1, 1]]
  }
  let newArr = [[1], [1,1]]
  for(let i = 2; i < numRows; i++) {
    let arr = newArr[i - 1]
    let arr2 = []
    // 下一层是上一层的两两之和
    for(let i = 0; i < arr.length - 1; i++) {
      arr2.push(arr[i] + arr[i+1])
    }
    newArr.push([1,...arr2,1])
  }
  return newArr
}

generate(5)
