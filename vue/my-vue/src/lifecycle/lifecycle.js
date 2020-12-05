import { Watcher } from '../observer/watcher'
export function mountComponent(vm, el) {
  const options = vm.$options
  // 真是的el挂载到$el
  vm.$el = el
  console.log(vm)
  // 渲染页面
  // 更新组件 
  let updateComponent = () => { // 无论是渲染还是更新都会调用此方法
    // 返回的是虚拟的dom
    // 虚拟的dom生成真实的dom
    // vm._render() 获取到的是虚拟的节点
    vm._update(vm._render())
  }
  // 渲染watcher 每个组件都有一个watcher
  // 默认渲染wathcer是没有回调的
  new Watcher(vm, updateComponent, ()=> {}, true) // 这是一个渲染watcher
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    
  }
}
