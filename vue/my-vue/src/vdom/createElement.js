export function createElement(tag, data = {}, ...children) {
  let key  = data.key
  if(key) {
    delete data.key
  }
  // 元素的虚拟节点
  return vnode(tag, data, key, children, undefined)
}

export function createTextNode(text) {
  console.log(text, 'text')
  // 文本的虚拟节点
  return vnode(undefined, undefined, undefined, undefined, text)
}

// // 虚拟节点  就是通过 _c _v 实现用对象来描述dom的操作
function vnode(tag, data, key, children, text) {
  return {
    tag: tag,
    key: key,
    data: data,
    children: children,
    text: text
  }
}
