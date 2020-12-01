/**
 * @param {string} s
 * @return {string}
 */
// 多层字符串处理
var reverseWords = function(s) {
  // s = s.split(' ')
  s = s.split('')
  for(let i = 0; i < s.length / 2; i++) {
    let temp = s[i]
    // console.log(s[s.length -i - 1])
    // 字符串赋值
    s[i] = s[s.length - i - 1]
    s[s.length -i - 1] = temp
  }
  return s.join('')
};
// 字符串通过索引改变值 是不能改变的
let a = '11111'
a[2] = '2'
console.log(a)

console.log(reverseWords("Let's"))

// 暴力破解法
// var reverseWords = function(s) {
// let arr = []
//   s = s.split(' ')
//   for(let i = 0; i < s.length; i++) {
//     s[i] = s[i].split('').reverse().join('')
//   }
//   return s.join(' ')
// };
