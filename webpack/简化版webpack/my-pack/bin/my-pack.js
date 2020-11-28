#! /usr/bin/env node

// 1、需要找到当前执行名的路径  拿到webpack.config.js
// console.log('start')
let path = require('path')

// 配置文件
let config = require(path.resolve('webpack.config.js'))

let Compiler = require('../lib/Compiler')
let compiler = new Compiler(config)

compiler.hooks.entryOtion.call()
compiler.run()

// compiler.emitFile()
