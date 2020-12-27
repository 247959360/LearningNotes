// 初始化状态
import Dep from '../observer/dep.js'
import { observer } from '../observer/index.js'
import Watcher  from '../observer/watcher'
import { isObject } from '../util/index.js'
export function initState(vm) {
  const opts = vm.$options
  // console.log(opts)
  // vue的数据来源 属性 方法 数据 计算属性 watch
  // 初始化 先属性 在方法
  if(opts.props) {
    initProps(vm)
  }
  if(opts.methods) {
    initMethod(vm)
  }
  if(opts.data) {
    initData(vm)
    // console.log("111111xxxxx")
    let keys = Object.keys(vm._data)
    // 这边也是需要进行递归处理的
    // 做一个代理  让用户可以直接通过 实例.xx 获取属性
    keys.forEach((key, index) => {
      // 也就是做一个引用而已  还是指向vm._data里面的数据
      proxy(vm, '_data', key)
    })
  }
  if(opts.computed) {
    initComputed(vm, opts.computed)
  }
  if(opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

function initProps(vm) {

}

function initMethod(vm) {
  
}

function initData(vm) {
  // console.log('初始化数据')
  let data = vm.$options.data
  // data里面的this指向还是实例
  data = vm._data = typeof data == 'function' ? data.call(vm) : data
  // 初始化数据后，处理数据 让用户可以直接修改data里面的数据
  // 将数据挂载到 vm._data 上面
  // console.log(vm._data, 'vm._data')
  // 对象劫持 用户改变了数据 我希望可以得到通知刷新页面
  observer(data) // 响应式原理
}

// 内部原理都是通过watcher实现的
function initComputed(vm, computed) {
  // _computedWatcher 存放者所有的计算属性对应的watcher

  const watchers = vm._computedWatcher = {}
  for(let key in computed) {
    const userDef = computed[key] // 获取用户的函数
    // 获取getter函数
    const getter = typeof userDef == 'function' ? userDef : userDef.get
    // 每个computed属性都对应一个自己的watcher lazy: true 表示计算属性
    watchers[key] = new Watcher(vm, getter, ()=> {}, { lazy: true })
    // 计算属性的挂载到实例上 通过vm实例上
    console.log("99999")
    defineComputed(vm, key, userDef)
  }
}

// 属性描述器
const sharePropertyDefinition = {
  enumerable: true,
  configureable: true,
  get: () => {},
  set: () => {}
}
function defineComputed(target, key, userDef) {
  if(typeof userDef == 'function') {
    sharePropertyDefinition.get = createComputedGetter(key)
  } else {
    sharePropertyDefinition.get = createComputedGetter(key)
    sharePropertyDefinition.set = userDef.set || (() => {})
  }
  // 做一个代理
  Object.defineProperty(target, key, sharePropertyDefinition)
}

// 添加缓存效果
function createComputedGetter(key) {
  return function() {
    // 做缓存效果
    // 拿到刚才的wacther  这是一个实例
    let wacther = this._computedWatcher[key]
    // console.log("xxxxx")
    if(wacther.dirty) { // 默认第一次取值为true
      console.log("数据重新获取了666666")
      wacther.evaluate()
    }
    // Dep.target 还有值的话  那么就需要进行依赖的收集
    if(Dep.target) {
      // wacther 指的是计算属性 watcher
      // console.log(key, "这里的key")
      wacther.depend(key)
    }
    return wacther.value
  }
}

// watch的原理是通过Watcher
function initWatch(vm, watch) {
  for(let key in watch) {
    const handler = watch[key]
    if(Array.isArray(handler)) {
      // 如果用户传递的是一个数组  就循环数组，将值依次创建
      for(let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      // 单纯的key value
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, key, handler, options = {}) {
  // console.log(vm)
  if(isObject(handler)) {
    // 直接把参数放在options上
    options = handler
    handler = handler.handler
  }
  // methods也是需要代理到实例上面 用户可以直接调用
  if(typeof handler == 'string') { // 获取methods里面的方法
    handler = vm.$options.methods[handler]
  }
  // console.log(handler, '111')
  // watch的原理就是$watch
  return vm.$watch(key, handler, options)
}
