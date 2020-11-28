let loaderUtil = require('loader-utils')
function loader(source) {
  let cb = this.async()
  let options = loaderUtil.getOptions(this)
  // console.log(options)
  // 和源码进行拼接
  cb(null, `/**${options.text}**/${source}`)
  return source
}

module.exports = loader