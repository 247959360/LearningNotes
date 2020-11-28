const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpackConfig = merge(
  baseConfig,
  {
    mode: 'production',
    optimization: { // 优化项
      minimizer: [
        new OptimizeCssAssetsWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      })
    ]
  }
)
  
module.exports = webpackConfig
