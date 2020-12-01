/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力破解法
// var findMin = function(nums) {
//   nums = nums.sort((a, b) => a - b)
//   return nums[0]
// };
/**
 * @param {number[]} nums
 * @return {number}
 */

var findMin = function(nums) {
  for(let i = 0; i < nums.length - 1; i++) {
    if(nums[i + 1] < nums[i]) {
      return nums[i+1]
    }
  }
  return nums[0]
}

console.log(findMin([3,4,5,1,2]))
