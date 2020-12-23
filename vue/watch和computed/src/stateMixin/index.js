import Watcher from "../observer/watcher"

export function stateMixin(Vue) {
  // exprOrFn 表达式 是一个key值
  Vue.prototype.$watch = function(exprOrFn, cb, options) {
    // 用户wathcer 自己写的  渲染wathcer 渲染时使用
    const vm = this
    // 实例 表达式 回调
    options.user = true
    new Watcher(vm, exprOrFn, cb, options)
  }
}
