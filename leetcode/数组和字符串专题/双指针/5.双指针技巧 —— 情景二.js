// 移除数组值等于val的值
function removeElement(arr, val) {
  let slow = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] == val) {
    } else {
      slow++
    }
  }
  return slow
}

console.log(removeElement([1,12,4,56,74,1,3], 1))
