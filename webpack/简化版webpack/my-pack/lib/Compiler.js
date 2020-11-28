let fs = require('fs')
let path = require('path')

let babylon = require('babylon')
// 这是es6模块 需要default下
let traverse = require('@babel/traverse').default
let t = require('@babel/types')
// 这是es6模块 需要default下
let generator = require('@babel/generator').default
let ejs = require('ejs')
let { SyncHook } = require('tapable')

// 创建文件依赖关系
class Compiler {
  constructor(config) {
    this.config = config
    // 找到入口文件
    this.entry = config.entry
    // 当前的工作路径
    this.entryId
    this.modules = {}
    this.root = process.cwd()
    // 加上一些生命的钩子
    this.hooks = {
      entryOtion: new SyncHook(), // 入口的钩子
      complie: new SyncHook(), // 编译期间的钩子
      afterCompile: new SyncHook(), // 编译结束后的钩子
      afterPlugins: new SyncHook(), // 插件使用后的钩子
      run: new SyncHook(), // 运行的钩子
      emit: new SyncHook(), // 输出文件的钩子
      done: new SyncHook() // 结束后的钩子
    }
    // 如果传递了plugin插件
    let plugins = this.config.plugins
    if(Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this)
      })
    }
    this.hooks.afterPlugins.call()
  }
  // 获取文件的内容
  getSource(modulePath) {
    // 源码
    let content = fs.readFileSync(modulePath, 'utf8')
    // 获取文件的扩展名
    // let basename = path.basename(modulePath)
    // let ext = path.extname(basename)
    // 获取匹配的规则
    let rules = this.config.module.rules
    // 拿到每一个规则进行处理
    rules.forEach((item, index) => {
      let { test, use} = item
      let len = use.length - 1
      // 正则直接匹配  就不要获取扩展名了
      if(test.test(modulePath)) { // 匹配上了  模块需要loader处理
        // 模块的处理从右向左
        // 封装插件处理 loaderHanlde 递归
        function loaderHanlde() {
          let loader = require(use[len--])
          // 获取对应的loader函数
          content = loader(content)
          // 如果还有插件 还需要在处理
          if(len >= 0) {
            loaderHanlde()
          }
        }
        loaderHanlde()
      }
    })
    return content
  }
  // 解析源码  所有模块名字都是相对于父路径的地址 parentPath
  parse(source, parentPath) { // AST语法树解析
    // babylon 主要就是把源码 转换成ast
    // @babel/traverse 遍历节点
    // @babel/types 节点替换
    // @babel/generator 生成结果
    let dependencies = [] // 依赖数组
    let ast = babylon.parse(source)
    // console.log(ast, "ast")
    traverse(ast, {
      CallExpression(p) {
        let node = p.node // 拿到对应的节点
        if(node.callee.name === 'require') {
          // require 方法 变成weback自定的方法 __webpack_require__
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') // .a.js
          moduleName = './' + path.join(parentPath, moduleName) // 拼接成 ./src/a.js
          dependencies.push(moduleName)
          // t.stringLiteral(moduleName) 改变节点的路径
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code
    return { sourceCode, dependencies }
  }
  // 创建模块的依赖
  buildModule(modulePath, isEntry) {
    // 获取文件的内容
    let source = this.getSource(modulePath)
    // 模块的名字 相对于当前的工作路径 唯一
    let moduleName = './' + path.relative(this.root, modulePath)
    // 取当前模块的父路径 path.dirname(moduleName)
    // 解析需要把source源码进行改造 返回一个依赖列表
    if(isEntry) {
      this.entryId = moduleName // 保存入口的名字
    }
    let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode
    // 解析完后每个模块 内部还有自己的模块
    // 递归解析内部的模块
    dependencies.forEach((dep) => { // 父模块的附属品 递归加载
      // path.join(this.root, dep) 传递进去的是一个绝对路径了
      this.buildModule(path.join(this.root, dep), false)
    })
    // console.log(sourceCode, dependencies)
  }
  emitFile() {
    // 用数据 渲染我们的模版
    // 输出路径
    let main = path.join(this.config.output.path, this.config.output.filename)
    // 模版的路径
    let templateStr = this.getSource(path.join(__dirname, './main.ejs'))
    // console.log(templateStr)
    // console.log(this.entryId)
    // console.log(this.modules)
    let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules })
    // console.log(code)
    this.assets = {}
    // 资源中 路径对应的代码
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
  }
  run() {
    this.hooks.run.call()
    this.hooks.complie.call()
    this.buildModule(path.resolve(this.root, this.entry), true)
    // console.log(this.module, this.entryId)
    this.hooks.afterCompile.call()
    this.emitFile()
    this.hooks.emit.call()
    this.hooks.done.call()
  }
}

module.exports = Compiler

// webpack 如何进行依赖的解析呢
