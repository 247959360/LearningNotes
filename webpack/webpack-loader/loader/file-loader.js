let loaderUtil = require('loader-utils')
function loader(source) {
  // 以hash和名字命名
  let filename = loaderUtil.interpolateName(this, `[hash].[ext]`, { content: source})
  // 将文件写到dist目录下 并以filename命名
  this.emitFile(filename, source) // 发射文件
  return `module.exports="${filename}"`
}
// module.exports 就会被被webpack 进行打包
loader.raw = true

module.exports = loader
