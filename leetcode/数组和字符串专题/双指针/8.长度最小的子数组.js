/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
// 元素的顺序是不需要改变的
// 滑动改变窗口的大小
const minSubArrayLen = (s, nums) => {
  let minLen = Infinity;
  let i = 0;
  let j = 0;
  let sum = 0;
  while (j < nums.length) {   // 主旋律是扩张，找可行解
    sum += nums[j];
    while (sum >= s) {        // 间歇性收缩，优化可行解
      minLen = Math.min(minLen, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }
  return minLen === Infinity ? 0 : minLen; // 从未找到可行解，返回0
}
// console.log(minSubArrayLen(7, [2,3,1,2,4,3]))
