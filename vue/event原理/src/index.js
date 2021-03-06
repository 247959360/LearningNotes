// Vue的核心代码 这个文件相当于整合的功能
import { init } from './init/init.js'
import { renderMixin } from './render/render.js'
import { lifecycleMixin } from './lifecycle/lifecycle.js'
import { initGlobalAPI } from './initGlobaleAPI/index.js'
import { stateMixin } from './stateMixin/index.js'

function Vue(options) {
  // 进行vue的初始化
  this._init(options)
}
// let vue = require('vue')
// console.log(vue)
// 通过引入文件的方式，给vue原型上添加方法
// 执行一下 把大 Vue传递进去

// 初始化全局化 API
initGlobalAPI(Vue)
// 先进性数据的初始化
init(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
// 在这里扩展一个方法
stateMixin(Vue)

// demo  产生两个虚拟节点进行比对
// template =》 render方法 =》 vnode

// initRender(Vue)
export default Vue

// function React() {
//   console.log('react')
//   this.a = 'sgjm'
//   this._init()
// }

// // 原型上的方法 可以获取当前的实例
// React.prototype._init = function() {
//   console.log(this)
// }

// new React()
