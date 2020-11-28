let less = require('less')

function loader(source) {
  let css = ''
  less.render(source, function(err, c) {
    css = c.css
  })
  // 将/n去掉
  css = css.replace(/\n/g, "")
  console.log(css)
  return css
}

module.exports = loader