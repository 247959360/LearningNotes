
let oldArrayMethods = Array.prototype
export let arrayMethods = Object.create(oldArrayMethods)

// 查找原型的方法  先从 __proto__ 上查找
// 找不到的话  再去 prototype上查找
// 
// 原型链看一下
const methods = [
  'unshift',
  'shift',
  'pop',
  'push',
  'splice',
  'sort',
  'reverse'
]

methods.forEach((method, index) => {
  arrayMethods[method] = function(...args) {
    // console.log('用户改变了数组')
    const result = oldArrayMethods[method].apply(this, args)
    let ob = this.__ob__
    // console.log(ob, 'ob方法')
    let inserted // 插入的元素是对象还需要在劫持
    // 获取到插入的数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2) // arr.splice(0,1,{name:1})
      default:
        break;
    }
    if(inserted) {
      // console.log(inserted, 'inserted')
      ob.observerArray(inserted)
    }
    ob.dep.notify() // 如果用户调用了 push，通知当前的dep更新
    return  result
  }
})
