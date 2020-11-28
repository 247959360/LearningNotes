class AsyncParalleHook { // 同步的钩子
  constructor(args) {
    this.tasks = []
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    let arr = []
    this.tasks.forEach((task) => {
      arr.push(task(...args))
    })
    return Promise.all(arr)
  }
}

let hooks = new AsyncParalleHook(['name'])

hooks.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    }, 1000)
  })
})

hooks.tapPromise('node', (name, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name)
      resolve()
    }, 1000)
  })
})

hooks.promise('sgjm').then((res => {
  console.log("end")
}))
