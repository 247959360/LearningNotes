let event = {
  task: {},
  on(type, fn) {
    if(this.task[type]) {
      this.task[type].push(fn)
    } else {
      this.task[type] = []
      this.task[type].push(fn)
    }
  },
  emit(type) {
    this.task[type].forEach((item, index) => {
      item()
    })
  }
}

event.on('eat', () => {
  console.log("吃了一次")
})

event.on('eat', () => {
  console.log("吃了二次")
})


event.on('sleep', () => {
  console.log("睡觉了")
})

event.emit('eat')
