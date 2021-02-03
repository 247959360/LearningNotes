class MyPromise {
  constructor(fn) {
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    this.state = 'pending'
    this.value = ''
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(value) {
    if(this.state === 'pending') {
      this.value = value
      this.state = 'resolved'
      this.resolveCallbacks.map((cb) => cb(value))
    }
  }
  reject(value) {
    if(this.state === 'pending') {
      this.value = value
      this.state = 'rejected'
      this.resolveCallbacks.map((cb) => cb(value))
    }
  }
  then(onFullFiled, onRejected) {
    if(this.state == 'pending') {
      this.resolveCallbacks.push(onFullFiled)
      this.rejectCallbacks.push(onFullFiled)
    }
    if(this.state == 'resolved') {
      onFullFiled(this.value)
    }
    if(this.state == 'rejected') {
      onRejected(this.value)
    }
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("1111")
  })
}).then((res) => {
  console.log(res, "xxxx")
})

// 判断对象是空对象
let obj = {
}

console.log(Object.keys(obj).length == 0)
