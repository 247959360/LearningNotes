/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// 暴力破解法 两层循环
var twoSum = function(numbers, target) {
  let map = new Map()
  for(let i = 0; i < numbers.length; i++) {
    let num = target - numbers[i]
    // for(let j = 0; j < numbers.length; j++) {
    //   if(num == numbers[j] && i !== j){
    //     return [i+1, j+1]
    //   }
    // }
    if(map.has(num)) {
      return [map.get(num), i]
    }
    map.set(numbers[i], i)
  }
  // map.set(1, 1)
  // map.set(1, 0)
  // console.log(map)
}
console.log(twoSum([11,3, 3, 15], 6))
