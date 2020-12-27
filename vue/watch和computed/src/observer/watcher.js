import Dep, { pushTarget, popTarget } from './dep.js'
import { queueWacther } from './schedular.js'

let id = 0
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm
    // this.exprOrFn = exprOrFn
    this.callback = callback
    this.options = options
    this.user = options.user // 用来标示用户的状态
    this.id = id++
    this.sync = options.sync
    // 集合不能重复
    this.depsId = new Set()
    this.lazy = options.lazy
    this.dirty = this.lazy
    this.deps = []
    // 将内部传过来的回调函数 放到getter属性上
    // data定义的属性是通过 
    if(typeof exprOrFn == 'function') {
      this.getter = exprOrFn
    } else {
      // computed里面的值是通过 这里的getter获取 所以想要更新就需要执行 computed创建的watcher里面的getter
      // 所以需要把那个依赖也进行收集，一个属性有多个依赖时，属性变化，就会依次执行多个依赖
      // 将getter方法封装成了一个取值函数
      this.getter = function() { // a.b.c.d
        let path = exprOrFn.split('.')
        let val = vm
        // console.log(path, 'path')
        // 取值
        for(let i = 0; i < path.length; i++) {
          val = val[path[i]]
        }
        // console.log(val)
        return val
      }
    }
    // 保存旧的值
    // 计算属性默认不会执行
    this.value = this.lazy ? undefined : this.get()  // 调用get方法  会执行渲染watcher
  }
  get() {
    // allName 这里会把name和age的wacther全部收集了
    // 所以不管是name还是age两者之间的一个变了  都会触发allName的值
    // 这里的watcher就是当前的watcher实例
    pushTarget(this) // 收集watcher  将watcher存在了Dep.target
    let value = this.getter.call(this.vm) // 渲染watcher执行
    popTarget()
    // console.log(this.id, 'watcher的id')
    return value
  }
  update() {
    if(this.sync) {
      this.run()
      // 计算属性的数据更新了
    } else if(this.lazy) { // 计算属性的值发生了变化 需要进行更新
      this.dirty = true
      // this.evaluate()
    } else {
      // console.log("执行了更新了111")
      // // 调用update的时候  等待一起更新 因为操作多次
      // // 都是调用同一个wacther 可以一起进行更新
      // console.log(this.id)
      // this.get()
      queueWacther(this)
    }
  }
  run() {
    // 获取老值
    let oldValue = this.value
    let newValue = this.get()
    // console.log(this.id, 'this.id')
    // 返回新的值
    this.value = newValue
    // console.log("更新了")
    if(this.user) {
      // 如果当前时用户watcher 就执行用户的wacther
      this.callback.call(this.vm, newValue, oldValue)
    }
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
    // console.log(this.deps)
  }
  // 取值
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }
  depend(key) {
    let i = this.deps.length
    // 进行watcher的收集
    while(i--) {
      this.deps[i].depend(key)
    }
  }
}
export default Watcher
