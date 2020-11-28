let loaderUtils = require('loader-utils')
function loader(source) {
  // console.log("file-loader2")
  // console.log(loaderUtils)
  // 将文件输出
  let filename = loaderUtils.interpolateName(this, `[hash].[ext]`, { content: source})
  // 将文件输出
  this.emitFile(filename, source)
  return `module.exports="${filename}"`
}

// loader.raw 获取的是一个buffer  不要被转换后的
loader.raw = true

module.exports = loader
