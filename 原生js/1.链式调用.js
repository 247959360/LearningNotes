/* 
  js实现链式调用  原理就是每次调用返回当前的this实例
*/
function Bird(name) {
  this.name = name
  this.eat = function() {
    console.log("eat")
    return this
  }
  this.sleep = function() {
    console.log("sleep")
    return this
  }
}

let bird = new Bird()
bird.eat().sleep()
