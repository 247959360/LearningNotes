let { AsyncSeriesWaterfallHook } = require('tapable')

class Lesson {
  constructor() {
    this.hook = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tapAsync() {
    // 事件的名称随意
    this.hook.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb(null, 'result')
      }, 1000)
    })
    this.hook.arch.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data)
        cb()
      }, 1000)
    })
  }
  start() {
    // 触发事件
    this.hook.arch.callAsync('sgjm', () => {
      console.log("end")
    })
  }
}

let l = new Lesson()
// 订阅两个事件
l.tapAsync()

l.start() // 启动钩子
