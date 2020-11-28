class DonePlugin {
  constructor() {
  }
  // 每个插件都有一个apply方法  传入当前的compiler对象
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log("编译完成")
    })
  }
}
module.exports = DonePlugin
