/* 
  js实现链式调用  原理就是每次调用返回当前的this实例
*/
// function Bird(name) {
//   this.name = name
//   this.eat = function() {
//     console.log("eat")
//     return this
//   }
//   this.sleep = function() {
//     console.log("sleep")
//     return this
//   }
// }

// let bird = new Bird()
// bird.eat().sleep()


// 数组的扁平化
let newArr = []
function flat(arr) {
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      return flat(arr[i])
    } else {
      newArr.push(arr[i])
    }
  }
}
flat([1,2,3, [4,5]])
console.log(newArr)

function myApply() {

}
