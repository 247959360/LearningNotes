/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力破解法
// 使用es6的语法处理
var removeDuplicates = function(nums) {
  let newArr = []
  for(let i = 0; i < nums.length; i++) {
    if(newArr.includes(nums[i])) {
    } else {
      newArr.push(nums[i])
    }
  }
  console.log(newArr)
  return newArr.length
};
console.log(removeDuplicates([1,1,2]))
