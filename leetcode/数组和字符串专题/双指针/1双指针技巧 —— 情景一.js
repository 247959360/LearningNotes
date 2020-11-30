function reverse(arr) {
  for(let i = 0; i < arr.length / 2; i++) {
    let temp = ''
    temp = arr[i]
    arr[i] = arr[arr.length - i - 1]
    arr[arr.length - i - 1] = temp
  }
  return arr
}

console.log(reverse([1,2,3,5,6]))
