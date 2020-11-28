console.log("hello world")

// // let str = require('inline-loader!./a.js')
// class A {
//   constructor() {
//     this.age = '18'
//   }
//   run() {
//     console.log("xxxxx")
//   }
// }

// let a = new A()
// a.run()
// console.log(a.age)

import p from './public.png'
let img = document.createElement('img')
img.src = p
document.appendChild(img)
