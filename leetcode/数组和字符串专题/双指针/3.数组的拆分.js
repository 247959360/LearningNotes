/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
  // 数组的 
  nums = nums.sort((a, b) => a - b)
  // 有一半的数需要相加
  // 倒数第二大 倒数第四大 依次排序
  let sum = 0
  console.log(nums)
  for(let i = 0; i < nums.length; i++) {
    if(i % 2 == 0) {
      sum += nums[i]
    }
  }
  return sum
}

console.log(arrayPairSum([6214, -2290, 2833, -7908]))