class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }
  tapAsync(args, task) {
    // 事件的名称随意  收集订阅的事件
    this.tasks.push(task)
  }
  callAsync(...args) {
    let finalCallback = args.pop()
    // 索引标记
    let index = 0
    // next方法控制流程
    let next = () => {
      if(this.tasks.length === index) return finalCallback()
      // 第一次执行的task， 并把next作为回调
      let task = this.tasks[index++]
      task(...args, next)
    }
    next()
  }
}

let hooks = new AsyncSeriesHook()
hooks.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name)
    cb()
  }, 1000)
})
hooks.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name)
    cb()
  }, 1000)
})

hooks.callAsync('sgjm', () => {
  console.log("end")
})
