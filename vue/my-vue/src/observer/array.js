
let oldArrayMethods = Array.prototype
export let arrayMethods = Object.create(oldArrayMethods)

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
