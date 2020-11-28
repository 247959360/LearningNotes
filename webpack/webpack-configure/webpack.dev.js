const path = require('path')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge');

const webpackConfig =  merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map'
})

module.exports = webpackConfig
