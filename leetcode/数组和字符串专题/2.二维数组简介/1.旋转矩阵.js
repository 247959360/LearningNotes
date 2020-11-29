// 解决矩阵旋转、对角线遍历、对子矩阵

// 因为需要对调  所以需要用到就是数组的解构和赋值了

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
//一、倒序倒置法
let rotate = (matrix) =>{
  for(let i = 0; i < matrix.length; i++){
      for (let j = i; j < matrix[i].length; j++){
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
      }
  }
  matrix.forEach(row=> row.reverse())
}
