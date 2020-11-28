
class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    // 触发事件
    let finalCallBack = args.pop()
    let index = 0
    let next = (err, data) => {
      let task = this.tasks[index]
      // 没有任务了  就退出
      if(!task) return finalCallBack(data)
      if(index === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}

let hook = new AsyncSeriesWaterfallHook()
hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name)
    cb(null, 'result')
  }, 1000)
})

hook.tapAsync('react', (data, cb) => {
  setTimeout(() => {
    console.log('react', data)
    cb(null, '最后一个了')
  }, 1000)
})

hook.callAsync('sgjm', (data) => {
  console.log(data)
})

// tapPromise 实现一下
