// 支持es6语法 引入
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',
  output: {
    file: 'dist/vue.js',
    name: 'Vue',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: "node_modules/"
    }),
    process.env.ENV === 'development' ? serve({
      open: false,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    }) : null
  ]
}