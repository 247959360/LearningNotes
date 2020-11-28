class SyncBailHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    try {
      this.tasks.forEach((item, index) => {
        let flag = item(...args)
        if(flag !== undefined && index < this.tasks.length - 1) {
          throw new Error('出错了')
        }
      })
    } catch (e){
      console.log('出错了')
    }
  }
}
let hooks = new SyncBailHook(['name'])

hooks.tap('node', (name) => {
  console.log('node', name)
})

hooks.tap('react', (name) => {
  console.log('react', name)
  return 'stop'
})

hooks.call('sg')

// 发布订阅的原理
