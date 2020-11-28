class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    // 触发事件
    let [first, ...other] = this.tasks
    return other.reduce((p, next) => {
      return p.then((data) => next(data))
    }, first(...args))
  }
}

let hooks = new AsyncSeriesWaterfallHook()
// 订阅两个事件
hooks.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve('返回结果了')
    })
  })
})

hooks.tapPromise('node', (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', data)
      resolve()
    })
  })
})

hooks.promise('name').then(() => {
  console.log("end")
})
