class AsyncPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('emit', (compliation, cb) => {
      setTimeout(() => {
        console.log("00000")
        cb()
      }, 100)
    })
    compiler.hooks.emit.tapPromise('emit', (compliation) => {
      return new Promise((resolve, reject) => {
        console.log("111111")
        resolve('1111')
      })
    })
    compiler.hooks.emit.tapPromise('emit', (compliation) => {
      return new Promise((resolve, reject) => {
        console.log("22222")
        resolve('22222')
      })
    })
  }
}

module.exports = AsyncPlugin
