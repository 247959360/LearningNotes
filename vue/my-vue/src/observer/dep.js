
let id = 0
export default class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // age: [] 对应了很多个watcher
    this.watcherId = new Set()
    this.watchers = []
  }
  depend() {
    // 观察者模式  数据变了，就进行更新
    // 判断当前的watcher是否重复
    // this.subs.push(Dep.target)
    // console.log(this.subs, this.id, 'this.subs')
    // return
    // for(let i = 0; i < this.subs.length; i++) {
    //   if(this.subs[i].id !== Dep.target.id) {
    //     this.subs.push(Dep.target)
    //   }
    // }
    // if(this.subs.length === 0) {
    //   this.subs.push(Dep.target)
    // }
    // // console.log(this.id, 'this.id')
    // // 相同的wathcer只存放一个
    // console.log(this.subs, 'this.subs')
    // console.log(Dep.target.id, 'Dep.target.id')
    // 上面是我自己解决的方式
    // watcher 记住当前的Dep实例
    console.log(`${this.id}---------------this.id`)
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update()
    })
  }
  // dep中存放watcher
  addSub(watcher) {
    this.subs.push(watcher)
    // console.log(this.subs, `${this.id}---------------this.id`)
    // let id = watcher.id
    // if(!this.watcherId.has(id)) {
    //   this.watcherId.add(id)
    //   this.watchers.push(watcher)
    // }
  }
}

// 一个变量可能有多个watch
let stack = []
// 第一次调用时 Dep.target 是渲染watcher
export function pushTarget(watcher) {
  Dep.target = watcher
  // console.log(watcher.id, '当前的watcher的id')
  stack.push(watcher)
}

// 移除时把渲染watcher去除
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
  // console.log(stack, '当前的stack')
}
