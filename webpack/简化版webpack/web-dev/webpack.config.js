let path = require("path")
class P {
  // 这边的事件 会加入到对象的生命周期里面，按序执行
  // 获取到当前的监听对像
  apply(complier) {
    // 绑定一个事件
    complier.hooks.emit.tap('emit', function() {
      console.log('emit')
    })
  }
}
class P1 {
  // 获取到当前的监听对像
  apply(complier) {
    // 绑定一个事件
    complier.hooks.complie.tap('complie', function() {
      console.log('complie')
    })
    complier.hooks.emit.tap('emit', function() {
      console.log('emit22')
    })
  }
}

class P2 {
  // 获取到当前的监听对像
  apply(complier) {
    // 绑定一个事件
    complier.hooks.done.tap('done', function() {
      console.log('done')
    })
  }
}


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // loader 文件夹下面的 style-loader
          // loader 文件夹下面的 less-loader
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader')
        ]
      }
    ]
  },
  plugins: [
    new P(),
    new P1(),
    new P2()
  ]
}
