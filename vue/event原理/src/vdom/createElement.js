import { isObject, isReservedTag, extractPropsFromVNodeData, def } from "../util/index"

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

// 创建组件 会调用vue的extend方法
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
      // Ctor是一个函数  一个拥有大Vue的构造函数
      // 实例化组件 需要把props的数据进行初始化处理
      let child = vnode.componentInstance = new Ctor({ _isComponent: true })
      console.log(child, 'child')
      // 组件的挂载  因为组件是没有el属性的
      // 将父组件的传递进来的props 挂载到当前的实例上 值的获取
      // 真实的vue比这个更加的复杂
      let props = vnode.componentOptions.propsData
      let keys = Object.keys(props)
      keys.forEach((key) => {
        def(child, key, props[key])
      })
      child.$mount()
    }
  }
  // 获取到子组件的props的值
  console.log(Ctor.options.props)
  console.log(data, 'xxxxxxx')
  // 创建虚拟节点的时候  就需要获取当前的值了
  const propsData = extractPropsFromVNodeData(data, Ctor)
  console.log(propsData, 'propsData')
  // -${Ctor.cid} 这个标价等下看下
  // propsData 会作为componentOptions的一个参数传递进去
  return vnode(`vue-coponent-${Ctor.cid}-${tag}`, data, key, undefined, undefined, { Ctor, children, propsData })
}

export function createTextNode(vm, text) {
  // console.log(text, 'text')
  // 文本的虚拟节点
  return vnode(undefined, undefined, undefined, undefined, text)
}

// 虚拟节点  就是通过 _c _v 实现用对象来描述dom的操作
// componentOptions props会作为这个的一个参数传入 进行创建vnode
function vnode(tag, data, key, children, text, componentOptions) {
  return {
    tag: tag,
    data: data,
    key: key,
    children: children,
    text: text,
    componentOptions
  }
}
