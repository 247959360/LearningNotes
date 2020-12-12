// data中的数据 重新定义
import { isObject, def } from '../util/index'
import { arrayMethods } from './array'
import Dep from './dep'

// 递归处理 里面的数据可能很复杂
class Observer {
  constructor(value) {
    // 创建一个dep属性给数组使用
    this.dep = new Dep()
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
      // 循环数组的每一项进行数组的劫持
      observer(item)
    })
  }
}

// 判断数组里面的值是否还是对象，是对象继续继续观察，不是的话就停止观察
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
  // 这个是依赖的实例  依赖的实例  没有
  let dep = new Dep()
  // console.log("初始化进行了数据的劫持")
  // observer返回的就是一个Observer实例
  // 这里传递进去的value有可能是一个数组，也有可能是一个对象
  let childOb = observer(value)
  Object.defineProperty(data, key, {
    // 获取值的时候 做一些操作
    configurable: true,
    enumerable: true,
    get() {
      console.log("取值")
      // 这个是Dep大类的Target 渲染一次就有了
      if(Dep.target) { // 如果当前有watcher了
        // 取值的时候 先把wathcer存起来
        dep.depend() // 我要将watcher存起来
        // 如果当前取值的时候，childOb是一个对象或者数组时
        if(childOb) { // 对象的依赖会收集 但是会被抛弃掉
          // childOb.dep.depend() // 数组的依赖收集
          // 当前是数组 需要进行依赖的收集  并且做一次循环递归处理
          // 防止数组里面套数组  依赖收集不全
          if(Array.isArray(value)) {
            console.log("进入数组的劫持")
            console.log(value)
            dependArray(value)
          }
        }
      }
      return value
    },
    // 设置值的时候 做一些操作
    set(newValue) {
      console.log("重新设置了数据了")
      if(newValue === value) return
      // 设置的值是对象  还需要再次进行数据的劫持
      observer(newValue)
      value = newValue
      // 设置值的时候  通知依赖的wathcer来进行更新操作
      dep.notify()
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

function dependArray(value) {
  for(let i = 0; i < value.length; i++) {
    let current = value[i]
    current.__ob__ && current.__ob__.dep.depend()
    if(Array.isArray(current)) {
      // 依赖收集数组的依赖
      console.log(current.__ob__, current, '数组')
      // 在一开始的数据劫持的时候  已经把所有对象都观测过了
      // 是数组，就对数组的每一项进行依赖进行收集
      dependArray(current)
    }
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
