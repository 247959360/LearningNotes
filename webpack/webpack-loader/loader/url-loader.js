let loaderUtil = require('loader-utils')
let mime = require('mime')
// mime可以获取前缀
function loader(source) {
  let options = loaderUtil.getOptions(this)
  let { limit } = options
  console.log(limit, 'limit')
  if(limit && limit > source.length) {
    console.log(mime.getType(this.resourcePath))
    // 直接返回base64
    return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    // return source
  } else {
    // 否则返回给 file-loader 进行数据的处理
    return require('./file-loader').call(this, source)
  }
  // 根据内容 生成hash名字
  // let filename = loaderUtil.interpolateName(this, '[hash].[ext]', { content: source})
  // this.emitFile(filename, source) // 发射文件
}
// 获取原生的buffer 不能转为字符串
loader.raw = true

module.exports = loader