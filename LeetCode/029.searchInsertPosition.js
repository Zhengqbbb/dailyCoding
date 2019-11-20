/*
 * @Author: Qbenben
 * @Date: 2019-11-21 00:30:17
 * @LastEditors: Qbenben
 * @LastEditTime: 2019-11-21 01:04:35
 * @Description: 029-搜索插入位置（search-insert-position）
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 你可以假设数组中无重复元素。
 * 
 * 示例 1:
 * 输入: [1,3,5,6], 5
 * 输出: 2
 * 
 * 示例 2:
 * 输入: [1,3,5,6], 0
 * 输出: 0
 * 
 * 示例 3:
 * 输入: [1,3,5,6], 2
 * 输出: 1
 */


var testNums = [1, 3, 4, 5, 6];
var testTarget = 4;
/**
 * @description:解法一：暴力破解： 
 * @param {number []} nums   排序数组
 * @param {number}    target 目标值
 * @return: 插入的索引
 */
var searchInsert_1 = function(nums, target) {
  if (nums[0] > target) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
}
console.log(searchInsert_1(testNums, testTarget));

/**
 * @description:解法二：二分法： 
 * @param {number []} nums   排序数组
 * @param {number}    target 目标值
 * @return: 插入的索引
 */
var searchInsert_2 = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.round((left + right) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
console.log(searchInsert_2(testNums, testTarget));
/**
 * @description:解法三：基于本题目对于解法二的二分法优化： 
 * 前7行增加了边界判断
 * while的判断条件变成了小于号
 * @param {number []} nums   排序数组
 * @param {number}    target 目标值
 * @return: 插入的索引
 */
var searchInsert_3 = function(nums, target) {
  const length = nums.length;
  if (nums[length - 1] < target) {
    return length;
  } else if (length === 0) {
    return 0;
  }
  let left = 0,
    right = length - 1;
  while (left < right) {
    let mid = (left + right) >>> 1;
    if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

console.log(searchInsert_3(testNums, testTarget));