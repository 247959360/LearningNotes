const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const Happypack = require('happypack')
module.exports = {
  entry: './src/index.js',
  // other: './src/other.js'
  devServer: { // 开发服务器的配置
    port: '3000', // 指定端口
    progress: true, // 打包显示进度条
    // open: true, // 自动打开窗口
    contentBase: '/dist', // 指定运行的目录
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: './'
  },
  // optimization: {
  //   splitChunks: { // 代码分割
  //     cacheGroups: { // 缓存组
  //       // 抽离自己的模块
  //       common: { // 公共的模块
  //         chunks: 'initial', // 从入口开始
  //         minSize: 0, // 最小大小为0 就抽离
  //         minChunks: 2 // 用过1次以上
  //       },
  //       // 第三方模块
  //       vendor: {
  //         priority: 1, // 设置权重 先抽离这个
  //         test: /node_modules/,
  //         chunks: 'initial', // 从入口开始
  //         minSize: 0, // 最小大小为0 就抽离
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
  module: {
    noParse: /jquery/,
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: 'Happypack/loader?id=js',
    //     include: /src/
    //   }
    // ],
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: /src/
      }
    ]
  },
  plugins: [
    // new Happypack({
    //   id: 'js',
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env']
    //       }
    //     }
    //   ]
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json'),
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
}