let { AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor() {
    this.hook = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tapAsync() {
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
    this.hook.arch.promise('sgjm').then((res) => {
      console.log("end")
    })
  }
}

let l = new Lesson()
// 订阅两个事件
l.tapAsync()

l.start() // 启动钩子
