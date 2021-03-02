// js 如何实现数组扁平化？

let newArr = []
function flat(arr) {
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      flat(arr[i])
    } else {
      newArr.push(arr[i])
    }
  }
  return newArr
}
// console.log(flat([1,3,4, [2,3]]))

// 数组的去重
function unique(arr) {
  let newArr = []
  let map = {}
  arr.forEach(item => {
    if(!map[item]) {
      newArr.push(item)
      map[item] = item
    }
  })
  return newArr
}
console.log(unique([1,3,4, 3]))

// 求两个数的最大公约数
function getMaxCommonDivisor(a, b) {
  if(b === 0) return a

}

// 回文字符串  就是对称字符串
function isPalindrome(str) {
  str = str.toLowerCase()
  let length = str.length
  let middle = Math.ceil(length / 2)
  // 将字符串反转  看是否相等
  let newStr = str.split('').reverse().join('')
  return newStr == str
}
console.log(isPalindrome('wweeHeeww'))

// 实现一个累加函数的功能比如

// 柯里化的实现
// 实现一个累加函数的功能比如 sum(1,2,3)(2).valueOf()
function currying(...args) {
  let result = 0
  result = args.reduce(function (pre, item) {
    return pre + item;
  }, 0);
  let add = function (...args) {
    result = args.reduce(function (pre, item) {
      return pre + item;
    }, result);
    return add;
  };
  add.valueOf = function () {
    console.log(result);
  }
  return add;
}

// 任务队列
function Queue() {
  let map = {
    1000: '1',
    3000: '2',
    4000: '3'
  }
  Object.keys(map).forEach((item, index) => {
    setTimeout(() => {
      console.log(map[item])
    }, item)
  })
}
Queue()
