export function isObject(data) {
  if (typeof data === 'object' && data !== null) {
    return true;
  } else {
    return false;
  }
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