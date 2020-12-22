let callbacks = []
let waiting = false
function flushCallback() {
  callbacks.forEach((cb => cb()))
  // console.log('所有的回调执行完之前 不能在执行异步')
  waiting == false
  callbacks = []
}

export function nextTick(cb) {
  // 多次调用nextTick 如果没有刷新的时候 就先把它放到数组里面进去
  // 刷新后 更新waiting
  callbacks.push(cb)
  // 只能触发一次 定时器
  // console.log(callbacks, 'callbacks')
  if(waiting == false) {
    // console.log("内部")
    setTimeout(flushCallback, 0)
    waiting = true
  }
}
