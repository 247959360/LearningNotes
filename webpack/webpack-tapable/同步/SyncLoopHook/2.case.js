class SyncLoopHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
    this.index = 0
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(params) {
    this.tasks.forEach((task) => {
      let ret
      do {
        ret = task(params)
      } while(ret !== undefined)
    })
  }
}
let hooks = new SyncLoopHook(['name'])

let total = 0
hooks.tap('react', (name) => {
  console.log('react', name)
  return ++total === 3 ? undefined : '继续学'
})

hooks.tap('node', (name) => {
  console.log('node', name)
})

hooks.call('sgjm')

// 发布订阅的原理
