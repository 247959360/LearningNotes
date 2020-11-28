class AsyncParalleHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    let finalCallback = args.pop()
    let index = 0
    let that = this
    function done() {
      index++
      if(index === that.tasks.length) {
        finalCallback()
      }
    }
    this.tasks.forEach((task) => {
      task(...args, done)
    })
  }
}

let hooks = new AsyncParalleHook(['name'])

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
