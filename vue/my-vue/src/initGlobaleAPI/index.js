import { mixin } from 'vue/types/umd'
import { mergeOptions } from '../util/index.js'
import { initMixin } from './mixin.js'
import { initAssetRegisters } from './asset'
import { initExtend } from './initExtend'
import { ASSETS_TYPE } from './const.js'

export function initGlobalAPI(Vue) {
  // 整个了所以全局相关的内容
  Vue.options = {}
  // 混入一些全局的API
  initMixin(Vue)
  // 初始化的全局过滤器 指令 组件
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + 's'] = {}
  })

  Vue.options._base = Vue // _base 是Vue的构造函数  也就是根Vue 永远指向父类

  // 注册extend方法 实现组件的继承
  initExtend(Vue)

  // 注册一些全局的方法
  initAssetRegisters(Vue)














  // Vue.mixin({
  //   a: 1,
  //   beforeCreate() {
  //     console.log('mixin1')
  //   },
  //   created() {
      
  //   }
  // })
  // Vue.mixin({
  //   b: 2,
  //   beforeCreate() {
  //     console.log('mixin2')
  //   }
  // })
  // vue选项的合并 options合并
  // console.log(Vue.options, 'options')

}
