class SyncHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(params) {
    this.tasks.forEach((item) => {
      item(params)
    })
  }
}
let hooks = new SyncHook(['name'])

hooks.tap('react', (name) => {
  console.log('react', name)
})

hooks.tap('node', (name) => {
  console.log('node', name)
})

hooks.call('sgjm')

// 发布订阅的原理
