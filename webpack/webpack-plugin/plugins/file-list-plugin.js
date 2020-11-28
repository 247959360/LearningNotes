class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename
  }
  // 每个插件都有一个apply方法  传入当前的compiler对象
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compliation) => {
      // assets 是打包的资源放的位置
      let assets = compliation.assets
      // let content = ``
      let content = `## 文件名     资源大小`
      Object.entries(assets).forEach(([filename, obj]) => {
        // console.log(filename, 'filename')
        // console.log(obj, 'obj.size')
        return content += `\n${filename}  ${obj.size()}`
      })
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}
module.exports = FileListPlugin
