class Observer {
  constructor() {
    this.subs = []
  }
  depend(fn) {
    this.subs.push(fn)
  }
  notify() {
    this.subs.forEach((item, index) => {
      item()
    })
  }
}

let obj = {
  name: 'sgjm',
  age: 19
}

// let observe = new Observer()

// 封装一下  如果通过 obj[key]获取 会导致死循环
function defineReative(obj, key, value) {
  let observe = new Observer()
  Object.defineProperty(obj, key, {
    get() {
      // console.log("取值")
      // observe.depend(() => {
      //   console.log("依赖的收集")
      // })
      observe.depend(() => {
        console.log("重新收集依赖")
      })
      return value
    }, 
    set(val) {
      // 通知依赖更新
      // console.log("设置值")
      // 更新依赖
      observe.notify()
      return val
    }
  })
}

let keys = Object.keys(obj)
keys.forEach((key, index) => {
  defineReative(obj, key, obj[key])
})

// 依赖收集
obj.name
// 依赖发生变化 进行
obj.name = 'sgjm'
