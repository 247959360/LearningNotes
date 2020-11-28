class SyncWaterfallHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(args) {
    // 利用闭包实现 数据的传递
    // let params = null
    // this.tasks.forEach((item, index) => {
    //   let res = item(params ? params : args)
    //   params = res
    // })
    // 利用 reduce实现
    let [first, ...other] = this.tasks
    let ret = first(args)
    other.reduce((a, b) => {
      b(a)
    }, ret)
  }
}

let hooks = new SyncWaterfallHook(['name'])

hooks.tap('node', (name) => {
  console.log('node', name)
  return 'node学习的还不错'
})

hooks.tap('react', (name) => {
  console.log('react', name)
})

hooks.tap('vue', (name) => {
  console.log('vue', name)
})

hooks.call('sg')

// 发布订阅的原理
