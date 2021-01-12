/* 
  手写
  new 方法的实现
*/
function Bird(name) {
  this.name = name
  this.eat = function() {
    console.log('eat')
  }
}

// 创建一个实例 实例是一个新的对象
let bird = new Bird()
bird.eat()
function myNew(Fn, ...args) {
  let obj = {}
  obj.__proto__ = Fn.prototype
  obj.__proto__.constructor = Fn
  Fn.apply(obj, ...args)
  return obj
}

let bird1 = myNew(Bird)
bird1.eat()
