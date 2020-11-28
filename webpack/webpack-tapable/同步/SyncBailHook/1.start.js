let { AsyncParallelHook } = require('tapable')

class Lesson {
  constructor() {
    this.hook = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() {
    // 事件的名称随意
    this.hook.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        // 每个方法都有一个回调  知道所有的回调数等于当前的订阅数
        // 才会执行 callAsync的回调
        cb()
      }, 1000)
    })
    this.hook.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
      }, 1000)
    })
  }
  start() {
    // 异步 那么就需要提供一个回调
    this.hook.arch.callAsync('sgjm', () => {
      console.log('end')
    })
  }
}

let l = new Lesson()
// 订阅两个事件
l.tap()

l.start() // 启动钩子
