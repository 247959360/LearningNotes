export function patch(oldVnode, vnode) {
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
  }
  // 2.递归创建真实节点 替换掉老得节点

}

function createElm(vnode) { // 根据虚拟节点创建真实节点
  // return document.createElement('div')
  let { tag, children, key, data, text } = vnode
  console.log(tag)
  // 是标签就创建标签 // 如果不是标签 就是文本
  if(typeof tag === 'string') {
    vnode.el = document.createElement(tag)
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
