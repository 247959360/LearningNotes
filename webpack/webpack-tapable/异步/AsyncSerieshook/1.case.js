class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }
  tapPromise(args, task) {
    // 事件的名称随意  收集订阅的事件
    this.tasks.push(task)
  }
  promise(...args) {
    let index = 0
    // 多个promise 串联起来
    // 采用 reduce
    let [first, ...other] = this.tasks
    // 这个的源码 和 redux是一样的
    // 把整个promise的值返回
    return other.reduce((p, next) => {
      // 第一个promise p.then 在调用promise 一直循环反复
      return p.then(() => next(...args)) 
    }, first(...args))
  }
}

let hooks = new AsyncSeriesHook()
hooks.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    }, 1000)
  })
})

hooks.tapPromise('node', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name)
      resolve()
    }, 1000)
  })
})

hooks.promise('sgjm').then(() => {
  console.log('end')
})
