// data中的数据 重新定义
import { isObject, def } from '../util/index'
import { arrayMethods } from './array'

// 递归处理 里面的数据可能很复杂
class Observer {
  constructor(value) {
    // 如果数据的层次过多 需要递归的去解析对象中的属性  依次增加 get和set
    // vue3 使用了proxy 就不需要依次的递归了 支持监听整个对象 也不需要set和get
    // 给每一个监控过的对象都加一个 __ob__ 属性 指向当前的Observer实例
    // value.__ob__ = this
    def(value, '__ob__', this)
    // Object.defineProperty(value, '__ob__', {
    //   // 不可被枚举
    //   enumerable: false,
    //   // 不可以被在修改
    //   configurable: false,
    //   // 值
    //   value: this
    // })
    if(Array.isArray(value)) {
      // 改变数组的原型上的方法 7个变异的方法  其他没有重写，还是直接走数组原先的方法
      // 不会被拦截
      value.__proto__ = arrayMethods
      // setArray()
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
    // 判断数组是否还有对象  也是需要进行劫持的
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
    configurable: true,
    enumerable: true,
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

// function setArray() {
//   let methods = [
//     'unshift',
//     'shift',
//     'pop',
//     'push',
//     'splice',
//     'sort',
//     'reverse'
//   ]
//   let oldPrototype = Array.prototype
//   methods.forEach((method) => {
//     Array.prototype[method] = function(value) {
//       console.log(oldPrototype)
//       // 这个会导致死循环
//       // let r = oldPrototype[method].call(this, value)
//       // return r
//     }
//   })
// }
// for(let i = 0; i < methods.length; i++) {
//   Array.prototype[methods[i]] = function(value) {
//     console.log(value)
//     // oldPrototype
//     // oldPrototype[methods[i]].call(this, value)
//     observer(value)
//   }
// }
