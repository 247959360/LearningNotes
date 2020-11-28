const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// dll文件存放的目录
// const dllPath = 'public/vendor'

module.exports = {
  mode: 'development',
  entry: {
    vue: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js', // 产生的文件名 
    library: '_dll_[name]', // 产生的那个变量的名字  可以随意起
    // libraryTarget: 'commonjs' // 以什么模块化输出  默认是var 以一个变量接收打包后的结果
    // 不然打包成功了，没有变量接收，相当于获取不到值
  },
  plugins: [
    // 清除之前的dll文件
    // new CleanWebpackPlugin({
    //   root: path.resolve(__dirname, dllPath),   //根目录
    // }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      // 生成一个清单 可以找到打包后的数据
      path:path.resolve(__dirname,'dist','manifest.json'),
      name: '_dll_[name]', // 保持与 output.library 中名称一致
      context: process.cwd()
    })
  ]
}