/* 
  1、怎么加事件监听，两种
  采用的方式
  onclick
  addEventListener
*/

const { isArray } = require("util")

/* 
  2、事件传播机制（事件流）
  冒泡和捕获
*/

/* 
  3、说一下原型链和原型链的继承吧
  constructor的意义是  找到这个类来自哪里，可以作为构造函数重新创建实例
*/

function Person(name) {
  this.name = name
  console.log("name")
}

console.log(Person.prototype.constructor)
new Person.prototype.constructor()

/* 
  什么是原型继承
  一个对象可以使用另外一个对象的属性或者方法,称之为继承，如果没有找到属性或者方法，我们可以通过对象的原型的原型继续查找，
  直到找到Object.prototype 此时的原型指向为null
*/

/* 
  谈一下对js的理解
  是基于原型的动态语言，主要有独特特性有this、原型和原型链
  js严格意义上来说分为： ecm标准语法和宿主环境部分

  宿主环境的 在浏览器宿主环境包括 DOM + BOM 等
  在 Node，宿主环境包括一些文件、数据库、网络、与操作系统的交互等
*/

/* 
  如何判断数组类型
  Array.isArray

  伪数组转为数组
  Array.from(xxx)
  Array.prototype.slice.apply(arguments)
*/

function Person() {
  
}

function Child() {

}
// 直接指向
// Child.prototype = Person.prototype
// Child.prototype.constructor = Child
// console.log(Child.prototype.constructor)

Child.prototype = Object.create(Person)

Child.prototype.constructor = Child

console.log(Child.prototype.constructor)

/* 
  问:如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
  不会继承，new的优先级大于bind，通过new进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，
  作为此函数的this，并且在此函数没有返回对象的情况下，返回和这个新建的对象
*/

// 递归实现数组的扁平化
function flatten(newArr, arr) {
  arr.forEach(element => {
    if(Array.isArray(element)) {
      return flatten(newArr, element)
    } else {
      newArr.push(element)
    }
  })
  return newArr
}
const a = [1, [2, [3, 4]]]
// console.log(flatten([], a))

// concat参数可以数组 也可以是对象
console.log([].concat([1,3]))
console.log([].concat(1,2,3))

let arr = [1,2,3,4]
let b = [5,6,7]
arr.concat(b)
arr.push(9)
b.push(10)
console.log(arr)

// concat也是不会改变原数组的

/* 
  实现柯里化
*/
function createCurry(func, args) {
  args = arguments
  let newArr = []
  return function() {

  }
}

a(1)(2)(3)()

let obj = {
  a: null,
  b: undefined,
  function() {
    console.log("xx")
  }
}
// JSON.stringify 如果对象的属性是undefined和function则去除
console.log(JSON.parse(JSON.stringify(obj)))

// 获取两个数之间的随机数
function random(a, b) {
  let min = Math.min(a, b)
  return Math.random() * (Math.abs(a-b)) + min
}
console.log(random(10,9))
// 页面级和控件级是什么意思


// 写一个方法从树形数据中找到指定id值的节点，输出此节点name

/* 
  数组的扁平化 处理一下
*/

