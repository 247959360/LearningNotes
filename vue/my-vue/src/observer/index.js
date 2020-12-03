// data中的数据 重新定义
import { isObject } from '../util/index'
import { arrayMethods } from './array'

// 递归处理 里面的数据可能很复杂
class Observer {
  constructor(value) {
    // 如果数据的层次过多 需要递归的去解析对象中的属性  依次增加 get和set
    // vue3 使用了proxy 就不需要依次的递归了 支持监听整个对象 也不需要set和get
    if(Array.isArray(value)) {
      // value.__proto__ = arrayMethods
      setArray()
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
  observerArray(value) {
    value.forEach((item, index) => {
      observer(item)
    })
  }
}

export function observer(data) {
  // 数据的劫持
  // console.log("数据的劫持")
  // 判断是否是对象
  let isObj = isObject(data)
  // console.log(isObj)
  if(!isObj) {
    return
  }
  // 观测这个对象
  return new Observer(data)
}

// 定义响应式数据
// data对象里面的key 定义为响应式数据
function defineReactive(data, key, value) {
  // console.log(key, value)
  observer(value)
  Object.defineProperty(data, key, {
    // 获取值的时候 做一些操作
    get() {
      return value
    },
    // 设置值的时候 做一些操作
    set(newValue) {
      console.log("重新设置了数据了")
      if(newValue === value) return
      // 设置的值是对象  还需要再次进行数据的劫持
      observer(newValue)
      value = newValue
    }
  })
}

export function initSet(Vue, vm) {
  Vue.prototype.$set = function(target, key, value) {
    // 响应式处理
    defineReactive(target, key, value)
    // vm._data = target
  }
}

function setArray() {
  let methods = [
    'unshift',
    'shift',
    'pop',
    'push',
    'splice',
    'sort',
    'reverse'
  ]
  let oldPrototype = Array.prototype
  methods.forEach((method) => {
    Array.prototype[method] = function(value) {
      console.log(oldPrototype)
      // 这个会导致死循环
      // let r = oldPrototype[method].call(this, value)
      // return r
    }
  })
}
// for(let i = 0; i < methods.length; i++) {
//   Array.prototype[methods[i]] = function(value) {
//     console.log(value)
//     // oldPrototype
//     // oldPrototype[methods[i]].call(this, value)
//     observer(value)
//   }
// }
