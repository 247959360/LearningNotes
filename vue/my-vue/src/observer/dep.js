
let id = 0
export default class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // age: [] 对应了很多个watcher
  }
  depend() {
    this.subs.push(Dep.target) // 观察者模式  数据变了，就进行更新
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update()
    })
  }
}

// 一个变量可能有多个watch
let stack = []
// 第一次调用时 Dep.target 是渲染watcher
export function pushTarget(watcher) {
  Dep.target = watcher
  console.log(watcher.id, '当前的watcher的id')
  stack.push(watcher)
}

// 移除时把渲染watcher去除
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
  console.log(stack, '当前的stack')
}
