/*
 * @Author: qbenben 
 * @Date: 2019-08-29 21:08:06 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-11-18 15:35:36
 * Leetcode001————两数之和(two-sum)
 */
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

var testNums = [1, 3, 2, 5, 6];
var tagter = 8;



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


/**
 * 1.开辟一块内存空间 result 
 * 2.通过map遍历nums，并使用indexOf寻找当前item的index之外和item相加等于target的结果
 * 3.最后把结果sort排序
 * @param   nums  数组
 * @param  targer 目标值
 */
/* var twoSum_2 = function(nums, target) {
  let result = [];
  nums.map((item, index) => {
    if (nums.indexOf(target - item) > -1 && nums.indexOf(target - item) != index) {
      result = [index, nums.indexOf(target - item)].sort((a, b) => a > b);
    }
  });
  return result;
}; */

var twoSum_2 = function(nums, target) {
  let result = [];
  nums.map((item, index) => {
    if (nums.indexOf(target - item) !== -1 && nums.indexOf(target - item) !== index) {
      result = [index, nums.indexOf(target - item)].sort((a, b) => a > b);
    }
  });
  return result;
}

//console.log(twoSum_2(testNums, 8));


/**
 * 使用Map对象
 * 判断nums[i]是否存在于Map对象中，没有的话，就存入target - nums[i]到Map
 * 返回[map.get(nums[i], i)]
 * @param   nums  数组
 * @param  targer 目标值
 */
var twoSum_3 = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    } else {
      map.set(target - nums[i], i);
    }
  }
};

//console.log(twoSum_3(testNums, 8));