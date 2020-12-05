import { initState } from './state.js'
import { initSet } from '../observer/index.js'
import { createLogger } from 'vuex'
import { compileToFunction } from '../compileToFunction/index.js'
import { mountComponent } from '../lifecycle/lifecycle.js'
// 在原型上添加一个init方法
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // 数据的劫持 当前的实例就是this
    const vm = this
    // this.$options 指代的就是用户传递的属性
    vm.$options = options
    
    initSet(Vue)
    // 初始化状态
    initState(vm)

    


    // 用户传入了人el属性  那么就需要渲染数据
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    // 默认会先查找render，没有render，会采用template， temeplate也没有会使用el中的内容
    if(!options.render) {
      // 对模版进行编译
      let template = options.template
      if(!template && el) {
        // el.outerHTML包含了el所有的元素
        template = el.outerHTML
      }
      // console.log(template)
      // 把template变成虚拟节点
      const render = compileToFunction(template)
      options.render = render
    }
    // 需要将当前的组件 挂载这个组件
    mountComponent(vm, el)
  }
}
