import { mixin } from 'vue/types/umd'
import { mergeOptions } from '../util/index.js'
export function initGlobalAPI(Vue) {
  // 整个了所以全局相关的内容
  Vue.options = {}
  
  Vue.mixin = function(mixin) {
    // 实现两个对象的合并
    this.options = mergeOptions(this.options, mixin)
  }
  Vue.mixin({
    a: 1,
    beforeCreate() {
      console.log('mixin1')
    },
    created() {
      
    }
  })
  Vue.mixin({
    b: 2,
    beforeCreate() {
      console.log('mixin2')
    }
  })
  // vue选项的合并 options合并
  // console.log(Vue.options, 'options')

}
