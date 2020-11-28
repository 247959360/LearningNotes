const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = {
  mode: 'production', // 模式  development production
  devServer: { // 开发服务器的配置
    port: '3000', // 指定端口
    progress: true, // 打包显示进度条
    // open: true, // 自动打开窗口
    contentBase: './build', // 指定运行的目录
    // watch: true
    proxy: {
      '/api/user': {
        target: `http://app.msyos.com/usc/web`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': ''
        }
      }
    }
  },
  entry: {
    index: './src/index.js',
    // main: './src/main.js'
  }, // 入口文件
  output: {
    filename: '[name].js', // 打包的文件名字
    path: path.resolve(__dirname, 'build') // 打包后的文件路径  绝对路径
  },
  devtool: 'eval-source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    // alias: {
    //   'bootstrap': 'bootstrap/dist/css/bootstrap.css',
    // },
    mainFields: ['style', 'main']
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
          // 'less-loader'
        ]
      },
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
  // optimization: { // 优化项
  //   minimizer: [
  //     new OptimizeCssAssetsWebpackPlugin(),
  //     new TerserWebpackPlugin()
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html', // 模版的路径
        filename: 'index.html', // 打包后模版的名字
        hash: true, // 打包的结果加上hash戳
        chunks: ['index']
      }
    ),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "static", to: "static" }
      ]
    }),
    new Webpack.BannerPlugin({
      banner: 'make by shangguan'
    }),
    new Webpack.DefinePlugin({
      DEV: "'development'" // 'dev'是一个字符串  需要用双引号包裹一下
    })
    // new HtmlWebpackPlugin(
    //   {
    //     template: './src/index.html', // 模版的路径
    //     filename: 'main.html', // 打包后模版的名字
    //     hash: true, // 打包的结果加上hash戳
    //     chunks: ['main']
    //   }
    // ),
    // new MiniCssExtractPlugin({
    //   filename: 'css/main.css'
    // }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ]
}
