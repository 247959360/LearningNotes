const path = require('path')

const DonePlugin = require('./plugins/DonePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./plugins/file-list-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
const UploadPlugin = require('./plugins/UploadPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'plugins')]
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new InlineSourcePlugin({
    //   match: /\.css/
    // }),
    new UploadPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new DonePlugin(),
    new AsyncPlugin(),
    new FileListPlugin({
      filename: 'list.md'
    })
  ]
}
