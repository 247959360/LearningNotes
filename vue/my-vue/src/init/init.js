import { initState } from './state'
import { initSet } from '../observer/index'

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
  }
}
