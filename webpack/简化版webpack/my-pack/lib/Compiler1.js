let fs = require('fs')
let path = require('path')

// 获取单个文件的内容
class Compiler {
  constructor(config) {
    this.config = config
    // 找到入口文件
    this.entry = config.entry
    // 当前的工作路径
    this.entryId
    this.module = {}
    this.root = process.cwd()
  }
  // 获取文件的内容
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf8')
    return content
  }
  // 创建模块的依赖
  buildModule(modulePath, isEntry) {
    // 获取文件的内容
    let source = this.getSource(modulePath)
    // 模块的名字 相对于当前的工作路径 唯一
    let moduleName = path.relative(this.root, modulePath)
    console.log(source, 'source')
    console.log(moduleName, 'moduleName')
  }
  run() {
    this.buildModule(path.resolve(this.root, this.entry), true)
  }
}

module.exports = Compiler

// webpack 如何进行依赖的解析呢
