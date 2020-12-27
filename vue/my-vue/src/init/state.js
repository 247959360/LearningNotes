// 初始化状态
import { observer } from '../observer/index.js'
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
    // initComputed(vm, opts.computed)
  }
  if(opts.data) {
    initWatch(vm)
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
  }
}

function initWatch(vm) {
  
}
