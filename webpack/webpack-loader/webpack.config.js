let path = require("path")

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 配置别名
  resolveLoader: {
    // 配置文件的插件文件
    // webpack现在内部集成了url-loader了
    modules: [path.resolve(__dirname, 'loader')],
    // alias: {
    //   loader1: path.resolve(__dirname, 'loader/my-loader.js')
    // }
  },
  devtool: 'source-map',
  // watch: true,
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'loader2',
      //   enforce: 'pre' // enforce 强制改变执行的顺序
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader3',
      //   enforce: 'post'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader1',
      // }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'banner-loader',
      //     options: {
      //       text: '上官建明'
      //     }
      //   }
      // },
      // loader是从下往上执行
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // 根据图片 生成md5戳  发射到dist目录下
        // file-laoder还会返回当前的图片路径
        use: 'file-loader2'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   // 根据图片 生成md5戳  发射到dist目录下
      //   // file-laoder还会返回当前的图片路径
      //   use: 'file-loader'
      // },
      // {
      //   test: /\.png$/,
      //   // 根据图片 生成md5戳  发射到dist目录下
      //   // file-laoder还会返回当前的图片路径
      //   use: {
      //     loader: 'file-loader2',
      //     options: {
      //       limit: 1 * 1024 // 这是一个数字
      //     }
      //   }
      // }
    ]
  }
}