import Dep, { pushTarget, popTarget } from './dep.js'
let id = 0
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm
    // this.exprOrFn = exprOrFn
    this.callback = callback
    this.options = options
    this.id = id++
    // 集合不能重复
    this.depsId = new Set()
    this.deps = []
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
    console.log("执行了更新了111")
    this.get()
  }
  // wathcer中存放Dep
  addDep(dep) { // watcher不能放重复的Dep， Dep里不能放重复的watcher
    let id = dep.id
    if(!this.depsId.has(id)) {
      this.depsId.add(id)
      // 保存当前的dep
      this.deps.push(dep)
      // 当前的watcher存放进去
      dep.addSub(this)
    }
    // 这个wacther 对应了两个Dep
    console.log(this.deps)
  }
}
export default Watcher
