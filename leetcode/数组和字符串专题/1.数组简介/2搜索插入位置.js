// 搜索插入位置
// 思路： 首先查找数字在数组的位置  找不到返回插入的顺序
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] == target) {
      return i
    } else if(nums[i] > target) {
      return i
    }
  }
  return nums.length
};