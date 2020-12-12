import { mergeOptions } from '../util/index.js'
// 单独抽出全局混入的方法
export function initMixin(Vue) {
  Vue.mixin = function(mixin) {
    // 实现两个对象的合并
    this.options = mergeOptions(this.options, mixin)
  }
}