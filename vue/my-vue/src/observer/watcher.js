import { pushTarget, popTarget } from './dep.js'
let id = 0
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm
    // this.exprOrFn = exprOrFn
    this.callback = callback
    this.options = options
    this.id = id++
    // 将内部传过来的回调函数 放到getter属性上
    this.getter = exprOrFn
    this.get()  // 调用get方法  会执行渲染watcher
  }
  get() {
    // 这里的watcher就是当前的watcher实例
    pushTarget(this) // 收集watcher  将watcher存在了Dep.target
    this.getter() // 渲染watcher执行
    popTarget()
  }
  update() {
    this.get()
  }
}
export default Watcher
