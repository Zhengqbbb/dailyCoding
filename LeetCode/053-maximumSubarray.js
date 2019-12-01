/*
 * @Author: Qbenben
 * @Date: 2019-12-01 22:49:04
 * @LastEditors: Qbenben
 * @LastEditTime: 2019-12-01 23:21:39
 * @Description: 053-最大子序和（maximum-subarray）
 * 
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例:
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 
 * 进阶:
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 */

/**
 * @description: 解法一：动态规划
 * @param {Array}  一个整数数组
 * @return: maxNum
 */
var maxSubArray_1 = function(nums) {
  let result = nums[0]; //最终结果值
  for (let i = 0; i < nums.length; i++) {
    let accumlativeValue = nums[i]; //本次累加值
    let highest = nums[i];
    for (let j = i; j + 1 < nums.length; j++) {
      accumlativeValue = accumlativeValue + nums[j + 1];
      if (accumlativeValue > highest) {
        highest = accumlativeValue;
      }
    }
    if (highest > result) {
      result = highest;
    }
  }
  return result;
}

var testNums = [-2, 1, -3, 4, -1, 2, 1, -5, 4, -3];
console.log(maxSubArray_1(testNums));


/**
 * @description: 解法二：暴力破解
 * @param {Array}  一个整数数组
 * @return: maxNum
 */
var maxSubArray_2 = function(nums) {
  let max = nums[0]; // 最高值
  let val = 0; // 累加值
  for (let i = 0; i < nums.length; i++) {
    val = val + nums[i];
    max = val > max ? val : max;
    val = 0 > val ? 0 : val;
  }
  return max;
}

console.log(maxSubArray_2(testNums));