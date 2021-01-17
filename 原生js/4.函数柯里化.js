function add() {
  // 伪数组 变成数组
  let args = Array.from(arguments)
  let currying = function () {
    if(arguments.length == 0) {
      return args.reduce((a, b) => a + b)
    } else {
      args.push(...arguments)
      return currying
    }
  }
  return currying
}
console.log(add(2)(3,4)())

// 柯里化 可以避免重复传参，有多个请求他的前面几个参数是一样
// 我们可以使用柯里化避免重复传参
