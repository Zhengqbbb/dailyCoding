/*
 * @Author: qbenben 
 * @Date: 2019-11-18 14:58:24 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-11-18 15:16:59
 * @Description: 027 - 移除元素（remove-element）
 * 
 * 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 */

/**
 * 示例 1:
 * 给定 nums = [3,2,2,3], val = 3,
 * 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
 * 你不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例 2:
 * 给定 nums = [0,1,2,2,3,0,4,2], val = 2,
 * 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
 * 注意这五个元素可为任意顺序。
 * 你不需要考虑数组中超出新长度后面的元素。
 */

/**
 * 解法一： 双指针
 * 1.遍历整个数组
 * 2.判断数组中是否有个需要移除的元素相等
 * 3.若两者相等，则移除该元素，并且遍历索引 i = i - 1 (因为splice()改变原来的数组，所以我们需要重新检查数组)
 * 
 * @param  {} nums   需要移除元素的数组
 * @param  {} target 目标值
 */
var removeElement_1 = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}

var testNums = [0, 1, 2, 2, 3, 0, 4, 2];
console.log(removeElement_1(testNums, 2));



/**
 * 解法二： 递归
 * 我们通过 indexOf() 方法来判断我们的数组中是否还存在需要移除的那个元素。
 * 在nums 和 target 的遍历中,nums.indexOf()的值为-1位终止条件
 * @param  {} nums    需要移除元素的数组
 * @param  {} target  目标值
 */
var removeElement_2 = function(nums, target) {
  if (nums.indexOf(target) != -1) {
    nums.splice(nums.indexOf(target), 1);
    return removeElement_2(nums, target);
  }
  return nums.length;
}

console.log(removeElement_2(testNums, 2));