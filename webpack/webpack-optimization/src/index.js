
// require('./a')
// require('./b')
// require('./c')
// // import Vue from 'vue'
// // new Vue({
// //   el: '#app',
// //   render() {
// //     return `<div>111111</div>`
// //   }
// // })

// let button = document.createElement("button")

// button.innerHTML = '按钮'
// console.log("1111222222")
// button.addEventListener('click', () => {
//   console.log("111222")
//   // 动态加载的插件
//   import('./source.js').then((res) => {
//     console.log(res.default)
//   })
// })

// document.body.appendChild(button)

import str from './source'
console.log(str)
if(module.hot) {
  console.log('1')
  module.hot.accept('./source.js', () => {
    let str = require('./source')
    console.log(str)
  })
}