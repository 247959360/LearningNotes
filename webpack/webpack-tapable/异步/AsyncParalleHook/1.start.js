let { AsyncParallelHook } = require('tapable')

// 利用promise.all 实现流程的控制
class Lesson {
  constructor() {
    this.hook = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() {
    // 事件的名称随意
    this.hook.arch.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 1000)
      })
    })
    this.hook.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 1000)
      })
    })
  }
  start() {
    // 触发事件
    this.hook.arch.promise('sgjm').then(() => {
      console.log("end")
    })
  }
}

let l = new Lesson()
// 订阅两个事件
l.tap()

l.start() // 启动钩子
