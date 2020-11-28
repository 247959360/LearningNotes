const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html', // 模版的路径
        filename: 'index.html', // 打包后模版的名字
        hash: true, // 打包的结果加上hash戳
        chunks: ['index']
      }
    ),
  ]
}