let { SyncWaterfallHook } = require('tapable')

class Lesson {
  constructor() {
    this.hook = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap() {
    // 事件的名称随意
    this.hook.arch.tap('node', (name) => {
      console.log('node', name)
      return 'node学的还不错'
    })
    this.hook.arch.tap('react', (data) => {
      console.log('react', data)
    })
  }
  start() {
    // 触发事件
    this.hook.arch.call('sgjm')
  }
}

let l = new Lesson()
// 订阅两个事件
l.tap()

l.start() // 启动钩子
