// 常见的js笔试题
// 1、字符串反转
function strReverse(str) {
  return str.split('').reverse().join('')
}
console.log(strReverse('abcd'))

// 2、判断字符串中出现次数最多的元素，并统计次数
function strMaxNumber(str) {
  let map = {}
  str.split('').forEach(item => {
    if(!map[item]) {
      map[item] = 1
    } else {
      map[item] = map[item] + 1
    }
  })
  let max = 0
  let el = null
  Object.keys(map).forEach((key, index) => {
    if(map[key] > max) {
      max = map[key]
      el = key
    }
  })
  console.log(map)
  console.log(el, max)
}
strMaxNumber('aahhbbbfffkkkk')

// 数组的去重
let arr=['a','a','a','s','h','g','a','y','t','a']
function duplicateRemove(arr) {
  // let newArr = Array.from(new Set(arr))
  // // console.log(newArr)
  // return newArr
  let map = []
  arr.forEach((item, index) => {
    map[item] = 0
  })
  return Object.keys(map)
}
console.log(duplicateRemove(arr))

// 4、使其按照指定的元素转化为驼峰式
let str4 = 'get-element-by-id'
function humpNaming(str4) {
  let arr = str4.split('-')
  let str = ''
  arr.forEach((item, index) => {
    if(index === 0) {
      str += item
    } else {
      console.log(item.substr(0, 1).toUpperCase())
      console.log(item)
      str += item.substr(0, 1).toUpperCase() + item.substr(1).toLowerCase()
    }
  })
  console.log(str)
  return str
}
humpNaming(str4)

// 5、将一串数字字符串转化为金钱格式

// 6、深拷贝
function deepClone(target) {
  let result
  if(typeof target == 'object') {
    if(Array.isArray(target)) {
      result = []
      for(let i in target) {
        result.push(deepClone[target[i]])
      }
    } else if(target===null) {
      result = null
    } else {
      result = {}
      for(let i in target) {
        result[i] = deepClone(target[i])
      }
    }
  } else {
   result = target
  }
  return result
}
console.log(deepClone({a:'1', c: '1'}))

// 手写实现apply
Object.prototype.myApply = function(context, argument) {
  // let obj = {}
  context.fn = this || window
  let res = context.fn(argument)
  delete context.fn
  return res
}

let obj1 = {
  a: (ag) => {
    console.log('a')
  }
}
let obj2 = {
  b: (ag) => {
    console.log('a11111')
    console.log(ag, '000000')
  }
}
obj2.b.myApply(obj1, ['12', '21'])

function myNew(Fn, ...args) {
  let obj = {}
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  let res = Fn.call(obj, ...args)
  if(typeof res === 'object') {
    return res
  } else {
    return obj
  }
}
function Person(name) {
  this.name = name
  console.log(this.name)
}
let my = myNew(Person, 'sgg')

// 柯里化 实现相加
function curring(...arg) {
  let result = 0
  arg.forEach((item, index) => {
    result += item
  })
  let add = (params) => {
    if(params == undefined) {
      return result
    } else {
      result += params
    }
    return add
  }
  return add
}

// 防抖
function debounce(func, wait, immediate) {
  let timer
  return function(...arguments) {
    clearTimeout(timer)
    if(this.immediate) {
      func.apply(null, arguments)
      this.immediate = false
    } else {
      timer = setTimeout(() => {
        func.apply(null, arguments)
      }, wait)
    }
  }
}
// 节流
function throttle(func, last, wait) {
  let pre = 0
  let timer
  return function() {
    let now = Date.now()
    let flag = (now - pre) > wait
    if(timer) {
      clearTimeout(timer)
    }
    if(flag) {
      func.apply(null, arguments)
      pre = now
    } else if(last){
      timer = setTimeout(() => {
        func.apply(null, arguments)
        pre = now
        timer = null
      }, (now - pre) > wait)
    }
  }
}

//  promise 的手写
// 手写promise.all 等方法
