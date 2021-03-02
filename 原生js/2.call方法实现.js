/* 
  手写
  继承的时候 call 改变this指向
  普通对象的this改变
*/

let obj2 = {
  name: 'jianming'
}

// 普通对象使用箭头函数  将会找不到this

let obj = {
  age: 10,
  name: 'sgjm',
  func(...args) {
    console.log(args)
    console.log(this.name)
  }
}
obj.func.call(obj2, 'a', 'b')

// 内部其实就是将当前的this的函数 拷贝一份到新的上下文中，新的上下问在执行这个方法
Object.prototype.myCall = function(context, ...args) {
  context = context || window
  // console.log(obj2)
  // call参数是多个
  context.fn = this
  // call
  context.fn(...args)
}

// apply 参数是一个数组  call 参数是多个的

obj.func.myCall(obj2, 'a', 'b')

// bind方法 需要在次调用才会执行  不会立即执行
Object.prototype.myBind = function(context, ...args) {
  context = context || window
  // console.log(obj2)
  // call参数是多个
  // context.fn = this
  // call
  const self = this
  // 返回一个新的函数  新的函数 用call或者apply进行绑定
  // 也就是切片编程
  return function() {
    self.call(context, ...args)
  }
}
// bind方法不能直接调用
let bind = obj.func.myBind(obj2)
bind()

// 最近全力学习  争取进入一线的大厂  然后好好的奋斗两年
function flatten(array) {
  let newArr = []
  for(let i = 0; i < array.length; i++) {
    if(Array.isArray(array[i])) {
      newArr = newArr.concat(flatten(array[i]))
    } else {
      newArr.push(array[i])
    }
  }
  return newArr
}
console.log(flatten([[1,2, [3,4], [5,5]]]))

// 将URL的参数转换成对象进行获取
function getParamsUrl(url) {
  url = url.substr(url.indexOf('?') + 1)
  let arr = url.replace(/&/g, ' ').split(' ')
  let params = {}
  arr.forEach((item, index) => {
    params[item.split('=')[0]] = item.split('=')[1]
  })
  return params
}
getParamsUrl('http://www.baidu.com?a=b&b=c')

function objToUrl(obj) {
  let keys = Object.keys(obj)
  let str = '?'
  keys.forEach((key, index) => {
    if(index !== keys.length - 1) {
      str = str + key + '=' + obj[key] + '&'
    } else {
      str = str + key + '=' + obj[key]
    }
  })
  console.log(str)
  return str
}
objToUrl({a: 1, b: 19})
