import { initState } from './state.js'
import { initSet } from '../observer/index.js'
import { createLogger } from 'vuex'
import { compileToFunction } from '../compileToFunction/index.js'
import { mountComponent, callHook } from '../lifecycle/lifecycle.js'
// 在原型上添加一个init方法
import { mergeOptions } from '../util/index.js'
import { nextTick } from '../util/next-tick.js'

export function init(Vue) {
  Vue.prototype._init = function(options) {
    // 数据的劫持 当前的实例就是this
    const vm = this
    // this.$options 指代的就是用户传递的属性
    // vm.$options = options
    
    // 将用户传递的和全局的合并  vm.constructor 指代的是子类
    // console.log(vm.constructor.options, 'vm.constructor.options')
    // console.log(options, 'options')
    // vm.constructor.options 保证谁调了这个类，options就指向谁
    // vue里面有extends方法  这个看看
    vm.$options = mergeOptions(vm.constructor.options, options)
    // 执行初始化的生命周期 beforeCreate 数据还没有被观察过，此时就没有什么get set这种东西
    callHook(vm, 'beforeCreate')
    
    // 设置$set 定义响应式数据   这个响应式方法  会对数据进行观察
    initSet(Vue)

    // 初始化状态
    initState(vm)
    // 此时数据已经被观察过了
    callHook(vm, 'created')

    // 用户传入了人el属性  那么就需要渲染数据
    // 执行数据的挂载
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  // 首先进行数据等一系列的初始化 挂载元素是，会对当前的模版进行一个编译
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
        // console.log(template, '111')
      }
      // console.log(template)
      // 把template变成虚拟节点
      const render = compileToFunction(template)
      options.render = render
      // console.log(options.render, 'options.render')
    }
    
    // 需要将当前的组件 挂载这个组件
    // 先挂载父元素  在挂载子元素
    // console.log(el, 'el')
    mountComponent(vm, el)
  }
  Vue.prototype.$nextTick = nextTick // 初始化nextTick
}
