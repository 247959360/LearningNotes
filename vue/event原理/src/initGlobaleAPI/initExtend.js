// 解析html  生成ast，在根据ast 生成jsx语法，在根据jsx语法生成虚拟的dom
// 虚拟的dom生成真实的dom
// 调用patch方法 
import { compileToFunction } from '../compileToFunction/index.js'
import { mountComponent, callHook } from '../lifecycle/lifecycle.js'
import { mergeOptions } from '../util/index.js'
// // 就是重复父类的操作
// // 创建子类  继承于父类 扩展的时候都扩展都自己的属性上
// let template = extendOptions.template
// console.log(template)
// // 生成jsx语法了
// compileToFunction(template)
// // Vue.$options.render = render
// // 生成虚拟dom

export function initExtend(Vue) {
  // 父类调用的是_init 进行出始化
  // 每个组件都有一个标记 防止组件多次调用名字重复了
  let cid = 0
  // extend 方法会进行选项的合并
  Vue.extend = function(extendOptions) {
    let Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.cid = cid++
    // 子类继承父类的原型  函数的继承使用prototype
    Sub.prototype = Object.create(this.prototype)
    // 这个方法会改变子类的构造函数
    Sub.prototype.constructor = Sub
    // 合并父子的选项
    Sub.options = mergeOptions(this.options, extendOptions)
    // console.log(this.options, '当前的选项')
    // console.log(Sub.options, '选项')
    // 子类的mixin use component等方法
    // 可以通过
    Sub.mixin = this.mixin
    // console.log(Sub.options, 'Sub.options')

    // console.log(Sub.options, 'Sub.options')
    if (Sub.options.props) {
      // initProps(Sub)
      // function initProps (Comp) {
      // 首先初始化 子组件的props属性 也就是进行一个代理 放在组件的
      // 做一个响应式的拦截  对组件的数据进行响应式拦截 以及依赖的收集
      // initProps(Sub)
      
    }
    return Sub
  }
}

// function initProps (Comp) {
//   const props = Comp.options.props
//   for (const key in props) {
//     proxy(Comp.prototype, `_props`, key)
//   }
// }

// export function proxy (target: Object, sourceKey: string, key: string) {
//   sharedPropertyDefinition.get = function proxyGetter () {
//     return this[sourceKey][key]
//   }
//   sharedPropertyDefinition.set = function proxySetter (val) {
//     this[sourceKey][key] = val
//   }
//   Object.defineProperty(target, key, sharedPropertyDefinition)
// }
