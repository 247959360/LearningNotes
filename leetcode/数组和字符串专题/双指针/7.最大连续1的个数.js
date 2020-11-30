/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let newArr = []
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] == 1) {
      newArr.push(nums[i])
    } else {
      newArr = []
    }
  }
  return newArr.length
}
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1]))
