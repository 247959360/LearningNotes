import { isReservedTag } from '../util/index'
export function patch(oldVnode, vnode) {
  // console.log(oldVnode, 'oldVnode')
  // 组件的挂载是没有 oldVnode的
  if(!oldVnode) {
    // vm.$mount()
    // 通过当前的虚拟节点  创建真实节点
    // 发现是组件
    return createElm(vnode)
  } else {
    // 1.判断是更新还是渲染
    const isRealElement = oldVnode.nodeType
    // 判断是否是真实的元素
    if(isRealElement) {
      const oldElm = oldVnode // div id="app"
      const parentEm = oldElm.parentNode // body
      let el = createElm(vnode)
      // 插入到老元素的下一个元素
      parentEm.insertBefore(el, oldElm.nextSibling)
      parentEm.removeChild(oldElm)
      // 渲染好的结果返回
      return el
    }
    // 2.递归创建真实节点 替换掉老得节点
  }
}
// 创建真实节点的时候 如果是组件  就需要进行初始化组件
function initCreateComponent(vnode) { // 初始化的作用
  // 组件的初始化
  let i = vnode.data
  if((i = i.hook) && (i = i.init)) {
    i(vnode)
  }
  // 表示是组件
  if(vnode.componentInstance) {
    return true
  } else {
    // 不是组件
    return false
  }
  // 组件的注册
  // const propsData = extractPropsFromVNodeData(data, Ctor, tag)
  // let ctor = new vnode.componentOptions.Ctor()
  // console.log(ctor, 'ctor')
  // console.log(vnode.componentOptions.Ctor, 'vnode.componentOptions.Ctor')
}


export function createElm(vnode) { // 根据虚拟节点创建真实节点
  // return document.createElement('div')
  let { tag, children, key, data, text } = vnode
  // console.log(children, 'children')
  // console.log(tag)
  // 是标签就创建标签 // 如果不是标签 就是文本
  if(typeof tag === 'string') {
    // tag 有可能是组件
    vnode.el = document.createElement(tag)
    // 是组件 创建组件的真实节点
    if(!isReservedTag(tag)) {
      // 返回真实的元素
      if(initCreateComponent(vnode)) {
        // console.log("组件")
        // 返回真实的元素节点
        // 创建组件的虚拟节点和真实元素 并返回
        return vnode.componentInstance.$el
      }
    }
    
    // 往标签上添加属性
    updateProperties(vnode)
    
    children.forEach(child => { // 递归创建儿子节点, 将儿子节点放入父节点
      return vnode.el.appendChild(createElm(child))
    });
  } else {
    // 虚拟dom上映射的真实dom  方便后续的更新操作
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(vnode) {
  let newProps = vnode.data
  let keys = Object.keys(newProps)
    keys.forEach((key, index) => {
    vnode.el.setAttribute(key, newProps[key])
  })
}
