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