export function isObject(data) {
  if (typeof data === 'object' && data !== null) {
    return true;
  } else {
    return false;
  }
}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mount',
  'beforeUpdate',
  'update',
  'beforeDestory',
  'destoryed'
]

let strats = {}
function mergeHook(parentVal,childVal) {
  if(childVal) {
    if(parentVal) {
      return [].concat(parentVal, childVal)
    } else {
      return childVal
    }
  } else {
    return parentVal
  }
}
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    // 不可被枚举
    enumerable: false,
    // 不可以被在修改
    configurable: false,
    // 值
    value: value
  })
}

// 合并用户传递进来的mixin options是父的选项  mixin是自己传递的
export function mergeOptions(parent, child) {
  const options = {}
  for(let key in parent) {
    mergeField(key)
  }
  for(let key in child) { // 已经合并过来  就不需要在合并了
    // 父元素已经有这个属性了， 就不需要在合并了
    if(!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  // 默认的合并策略是这样  但是有些属性  需要特殊的合并方式
  // 生命周期的合并
  function mergeField(key) {
    // 生命周期单独的策略去合并
    // watch computed 等各种合并 采用不同的策略
    if(strats[key]) {
      console.log("1111")
      return options[key] = strats[key](parent[key], child[key])
    }
    if(typeof parent[key] === 'object' && typeof child[key] == 'object') {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    } else if(child[key] == null) {
      options[key] = parent[key]
    } else {
      options[key] = child[key]
    }
  }
  return options
}
