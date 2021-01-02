// 保存watcher队列  多次调用update 就讲当前的update进行过滤。 采用了异步setTimeout
// 进行代码的处理
import { nextTick } from '../util/next-tick.js'

// 执行更新的队列
function flushSchedularQueue() {
  queue.forEach((item, index) => {
    item.run()
    queue = [] // 让下一次继续执行
    has = {}
  })
}

let queue = []
let has = {}
export function queueWacther(watcher) {
  const id = watcher.id
  if(has[id] == null) {
    queue.push(watcher)
    // 异步进行更新  同步的会比这个异步先执行  所以就不会多次执行了
    has[id] = true
    // vue使用了nextTick 进行异步更新
    nextTick(flushSchedularQueue)
  }
}

// 用户也是可以调用nextTick的
