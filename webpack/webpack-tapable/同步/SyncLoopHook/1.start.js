let { SyncLoopHook } = require('tapable')

class Lesson {
  constructor() {
    this.index = 0
    this.hook = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap() {
    // 事件的名称随意
    this.hook.arch.tap('node', (name) => {
      console.log('node', name)
      return ++this.index === 3 ? undefined : '继续学'
    })
    this.hook.arch.tap('react', (name) => {
      console.log('react', name)
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
