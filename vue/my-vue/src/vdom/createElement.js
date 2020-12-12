import { isObject, isReservedTag } from "../util/index"

// 创建虚拟节点的时候，他会判断当前元素是否是组件
// 是组件就会进行单独的处理
export function createElement(vm, tag, data = {}, ...children) {
  let key  = data.key
  if(key) {
    delete data.key
  }
  // 元素的虚拟节点

  // 判断是否是原始标签
  if(isReservedTag(tag)) {
    return vnode(tag, data, key, children, undefined)
  } else {
    // 组件 找到组件的定义
    // console.log(tag, 'tagtagtagtagtag')
    let Ctor = vm.$options.components[tag]
    // 返回的也是一个虚拟的节点
    // console.log(createComponent(vm, tag, data, key, children, Ctor), 'createComponent(vm, tag, data, key, children, Ctor)')
    // 生成组件的虚拟节点
    return createComponent(vm, tag, data, key, children, Ctor)
  }
}

function createComponent(vm, tag, data, key, children, Ctor) {
  if(isObject(Ctor)) {
    // 对组件进行extend继承  让组件拥有和大Vue的能力
    Ctor = vm.$options._base.extend(Ctor)
  }
  // 组件的初始化
  data.hook = {
    init(vnode) {
      // 当前组件的实例  就是 componentInstance
      // 进行组件的一系列的初始化
      let child = vnode.componentInstance = new Ctor({_isComponent: true})
      // console.log(child, 'child')
      // 组件的挂载  因为组件是没有el属性的
      child.$mount()
    }
  }
  // -${Ctor.cid} 这个标价等下看下
  return vnode(`vue-coponent-${Ctor.cid}-${tag}`, data, key, undefined, undefined, { Ctor, children })
}

export function createTextNode(vm, text) {
  // console.log(text, 'text')
  // 文本的虚拟节点
  return vnode(undefined, undefined, undefined, undefined, text)
}

// 虚拟节点  就是通过 _c _v 实现用对象来描述dom的操作
function vnode(tag, data, key, children, text, componentOptions) {
  return {
    tag: tag,
    key: key,
    data: data,
    children: children,
    text: text,
    componentOptions
  }
}
