import Watcher  from '../observer/watcher'
import { patch } from '../vdom/patch.js'
export function mountComponent(vm, el) {
  const options = vm.$options
  // 真是的el挂载到$el
  vm.$el = el
  // console.log(vm)
  // 执行生命周期 可以拿到el，但是el还没有被渲染完
  callHook(vm, 'beforeMount')
  // 渲染页面
  // 更新组件 
  let updateComponent = () => { // 无论是渲染还是更新都会调用此方法
    // 返回的是虚拟的dom
    // 虚拟的dom生成真实的dom
    // vm._render() 获取到的是虚拟的节点
    // console.log(vm._render(), 'vm._render()')
    vm._update(vm._render())
  }
  // 渲染watcher 每个组件都有一个watcher
  // 默认渲染wathcer是没有回调的
  new Watcher(vm, updateComponent, ()=> {}, true) // 这是一个渲染watcher
  callHook(vm, 'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    const vm = this
    // console.log(vnode, 'vnode')
    vm.$el = patch(vm.$el, vnode)
  }
}

// _update 的patch 此时已经创建了真实的dom

export function callHook(vm, hook) {
  const handles = vm.$options[hook]
  if(handles) {
    if(handles.length === 0) {
      handles.call(vm)
    }
    for(let i = 0; i < handles.length; i++) {
      // 绑定了 当前的this  用户就可以获取当前this
      handles[i].call(vm)
    }
  }
}
