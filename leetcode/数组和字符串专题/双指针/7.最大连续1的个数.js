/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let newArr = []
  let max = 0
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] == 1) {
      console.log("xxxx")
      newArr.push(nums[i])
    } else {
      if(max < newArr.length) {
        max = newArr.length
      }
      newArr = []
    }
  }
  if(max < newArr.length) {
    max = newArr.length
  }
  return max
}
console.log(findMaxConsecutiveOnes([1,0,1,1,0,1]))
