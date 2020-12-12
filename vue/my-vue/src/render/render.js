import { createElement, createTextNode } from '../vdom/createElement.js'
export function renderMixin(Vue) {
  // _c 创建元素的虚拟节点
  // _v 创建文本的虚拟节点
  // _s JSON.stringify
  Vue.prototype._c = function() {
    return createElement(this, ...arguments) // 标签名 属性 children
  }
  Vue.prototype._v = function(text) {
    return createTextNode(this, text)
  }
  Vue.prototype._s = function(val) {
    // 变量的值 可能是一个对象  普通字符串直接返回
    // 是一个对象展示的话 需要JSON.stringify一下 不然页面无法展示
    return val === '' ? '' : (typeof val === 'object' ? JSON.stringify(val) : val) 
  }
  Vue.prototype._render = function() {
    // console.log('render')
    const vm = this
    const { render } = vm.$options
    const vnode = render.call(vm) // 绑定当前的this
    // console.log(render, 'xxxxxxx')
    // console.log(vnode, 'vnode')
    return vnode
  }
}
