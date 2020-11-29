// 采用map映射 反向得映射处理
var twoSum = function(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
    let num = target - nums[i]
    if(map.has(num)) {
      return [map.get(num), i]
    }
    map.set(nums[i], i)
  }
};
// forEach 循环return 停止不了  最好采用for循环
console.log(twoSum([2,7,9,12], 9))

var twoSum = function(nums, target) {
  let map = {}
  for(let i = 0; i < nums.length; i++) {
    let num = target - nums[i]
    if(map[num] !== undefined) {
      return [map[num], i]
    }
    map[nums[i]] = i
    console.log(map)
  }
};
console.log(twoSum([2,7,9,12], 9))