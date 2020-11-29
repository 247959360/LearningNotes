/**
 * @param {string[]} strs
 * @return {string}
 */
// 每个字符串当作一个数组 看成二维数组  两两比较
var longestCommonPrefix = function(strs) {
  if(strs.length === 0) {
    return ''
  }
  let max = strs[0]
  for(let i = 1; i < strs.length; i++) {
    let j = 0
    for(; j < strs[i].length && j < max.length; j++) {
      if(strs[i][j] !== max[j]) {
        break
      }
    }
    max = max.substr(0, j);
    if(max === "") {
      return max
    }
  }
  return max
}
console.log(longestCommonPrefix(["flower","flow","flight"]))
