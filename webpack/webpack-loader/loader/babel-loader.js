let babel = require('@babel/core')
// 可以获取loader里面的参数
let loaderUtil = require('loader-utils')
function loader(source) {
  let options = loaderUtil.getOptions(this)
  let cb = this.async()
  babel.transform(source, {
    ...options,
    sourceMap: true
  }, function(err, result) {
    cb(err, result.code, result.map) // 异步的
  })
}

module.exports = loader
