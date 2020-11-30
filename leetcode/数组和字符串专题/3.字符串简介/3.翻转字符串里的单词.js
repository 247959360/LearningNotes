// 输入："the sky is blue"
// 输出："blue is sky the"
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s = "a good   example") {
  // 先变成数组
  let newStr = ''
  if(s == '') {
    return ''
  }
  s = s.split(' ').reverse()
  s.forEach((item, index) => {
    if(index == 0 ) {
      newStr += item
    } else {
      if(item !== '') {
        newStr += ' ' + item
      }
    }
  })
  // trim 去除首尾的空格
  return newStr.trim()
}

reverseWords()
