// 数组简介
// LC寻找数组的中心索引

// 中心索引 不是指索引是数组的一半，而是索引，让左右两边的数组的和是一样的

// 反向解法，做减法

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  let sum = nums.reduce((a, b) => {
    return a + b
  }, 0)
  let leftSum = 0
  for(let i = 0; i < nums.length; i++) {
    if(leftSum == (sum - nums[i] - leftSum)) {
      return i
    }
    leftSum += nums[i]
  }
  return -1
}
console.log(pivotIndex([1,7,3,6,5,6]))
