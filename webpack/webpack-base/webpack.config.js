let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let TerserWebpackPlugin = require('terser-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'development', // 模式  development production
  devServer: { // 开发服务器的配置
    port: '3000', // 指定端口
    progress: true, // 打包显示进度条
    // open: true, // 自动打开窗口
    contentBase: './build' // 指定运行的目录
  },
  entry: './src/index.js', // 入口文件
  output: {
    publicPath: 'http://www.com/',
    filename: 'js/[name].js', // 打包的文件名字
    path: path.resolve(__dirname, 'build') // 打包后的文件路径  绝对路径
  },
  // externals: {
  //   jquery: '$'
  // },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //   },
      //   enforce: 'pre'
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              "@babel/plugin-proposal-async-generator-functions",
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(jpe?g|png|bmp|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            esModule: true,
            limit: 1 * 1024,
            outputPath: 'image',
            publicPath: 'http://www.baidu.com'
          }
        }
      }
    ]
  },
  optimization: { // 优化项
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html', // 模版的路径
        filename: 'index.html', // 打包后模版的名字
        hash: true, // 打包的结果加上hash戳
        // minify: {
        //   removeAttributeQuotes: true, // 去除双引号
        //   collapseWhitespace: true, // 去除空格
        // }
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
