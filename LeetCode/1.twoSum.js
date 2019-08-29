/*
 * @Author: qbenben 
 * @Date: 2019-08-29 21:08:06 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-29 21:19:55
 * Leetcode001————两数之和(two-sum)
 */
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

var testNums = [2, 7, 11, 15];
var tagter = 9;



/**
 * 解题思路：使用双重 for 循环破解
 * @param   nums  数组
 * @param  targer 目标值
 */
var twoSum_1 = function(nums, targer) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === targer - nums[i]) {
        return [i, j];
      }
    }
  }
}

//console.log(twoSum_1(testNums, 9));