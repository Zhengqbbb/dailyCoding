/*
 * @Author: QB
 * @Date: 2019-11-15 17:03:32
 * @LastEditTime: 2019-11-15 17:27:10
 * @LastEditors: qbenben
 * @Description: 026 - 删除排序数组中的重复项（remove-duplicates-from-sorted-array）
 * 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 */


/**
 * 解法1：双指针：因为数字数组是经过排序后得到的所以第二个指针可以为i+1；
 * 而然这种方法的耗时和空间都比其他大，因为splice。
 * splice：先执行删除操作，删除指定个数的元素，然后再插入elements（元素或者数组），
 * 他的每次删除都涉及大量元素的重新排列，而在插入元素时引入队列来管理，所以splice（）效率不高
 * @param  {} nums
 */
var removeDuplicates_1 = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

var testNums = [1, 1, 2];
console.log(removeDuplicates_1(testNums));

/**
 * 解法二：违规操作使用set去重
 * 首先虽然他符合题意，但是它又可行，所以不管怎么说，盲就对了
 * 然后Set去重都不陌生了，只需要注意返回数组的长度即可
 * @param  {} nums
 */
var removeDuplicates_2 = function(nums) {
  var arr = [...new Set(nums)];
  for (let i = 0; i < arr.length; i++) nums[i] = arr[i];
  return arr.length;
}

console.log(removeDuplicates_2(testNums));