class InlineSourcePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // console.log(compiler, "compiler")
    compiler.hooks.done.tap('tap', (compliation) => {
      // console.log("编译完成11111")

    })
  }
}

module.exports = InlineSourcePlugin

// let mutations = {
//   // selcetObject
//   // 赋值
//   selcetObject(data) {
//     console.log(data)
//   },
//   // 删除指定项
//   deleteObject(data) {
//     console.log(data)
//   },
//   // 全部删除
//   deleteAllObject(data) {
//     console.log(data)
//   }
// }
// let allMutations = {
//   mutation1: {
//     mutationsChild: {
//       mutations222: mutations
//     }
//   },
//   mutation2: mutations
// }


// let map = {}
// let keys = Object.keys(allMutations)
// keys.forEach((key, index) => {
//   let obj = allMutations[key]
//   for(let name in obj) {
//     map[key + '/' + name] = obj[name]
//   }
// })

// console.log(map)

// let store = {
//   tasks: {},
//   commit(functionName,  params) {
//     this.tasks[functionName](params)
//   }
// }
// store.tasks = map
// store.commit('mutation1/selcetObject', "22828828282")

// this.$store = store
