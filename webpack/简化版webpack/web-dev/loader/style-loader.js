// style-loader 就是把转换后的css 代码插入到style里面进去
function loader(source) {
  // JSON.stringify 把css代码转换成一行
  let style =  `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    console.log('样式不生效')
    document.head.appendChild(style)
  `
  return style
}
module.exports = loader