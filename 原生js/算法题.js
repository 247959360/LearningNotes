/**
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */
function getIntersection(...args) {
  let newArr = []
  args.forEach((item, index) => {
    newArr.push(item.sort((a, b) => a - b))
  })
}
getIntersection([5, 2], [4, 9], [3, 6])

// 算法题：从数组 [1, 5, 8, 10, 12] 中找到两个数和为 9，返回 [1, 8] 这样的结果。
// 算法题：从数组 [1, 5, 8, 10, 12] 中找到三个数和为 19，返回 [1, 8， 10] 这样的结果。
// 算法题 leetcode 300[4]：给定一个无序的整数数组，找到其中最长上升子序列的长度。

function twoSum(arr, sum) {
  let newArr = []
  for(let i = 0; i < arr.length; i++) {
    let start = arr[i]
    arr.forEach((item, index) => {
      if(sum - start == item && index > i) {
        newArr.push(start, item)
      }
    })
  }
  return newArr
}
// twoSum([1, 5, 8, 10, 12], 9)

function threeSum(arr, sum) {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    let start = arr[i]
    result = []
    let remain = sum - start
    let newArr = JSON.parse(JSON.stringify(arr))
    newArr.splice(i, 1)
    result.push(arr[i], ...twoSum(newArr, remain))
    if(result.length === 3) {
      return result
    } else {
      result = []
    }
  }
  return []
}
console.log(threeSum([1, 5, 8, 10, 12], 19))

function maxUp(arr) {
  let max = 1
  let newArr = []
  arr.forEach((item, index) => {
    if(index > 0 && item > arr[index -1]) {
      max++
    } else {
      newArr.push(max)
      max = 1
    }
  })
  return Math.max(...newArr)
}
console.log(maxUp([1,2,3,4,2,3,4,5,6,2]))