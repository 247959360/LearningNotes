import { ASSETS_TYPE } from '../initGlobaleAPI/const.js'

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

// strats.props  = mergeProps
function mergeProps(parentVal,childVal) {
  // console.log(parentVal, childVal)
}

function normalizeProps(options, vm) {

}

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
      // console.log("1111")
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

ASSETS_TYPE.forEach((type) => {
  strats[type + 's'] = mergeAssets
})
// 组件的合并策略
// strats.components = mergeAssets()
function mergeAssets(parentVal, childVal) {
  // Object.create 相当于 res.__proto__ == parentVal
  // res 相当于拷贝一份父亲的原型 也就是__proto__ 指向的是父元素
  const res = Object.create(parentVal)
  // console.log(res, 'parentVal------childVal')
  // 把子元素的东西放到res上面  作为属性
  if(childVal) {
    for(let key in childVal) {
      res[key] = childVal[key]
    }
  }
  return res
}

export function isReservedTag(tag) {
  let arr = ['a', 'div', 'span', 'h', 'button', 'input', 'p']
  return arr.includes(tag)
}
