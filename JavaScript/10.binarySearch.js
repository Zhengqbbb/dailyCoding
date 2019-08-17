/*
 * @Author: qbenben 
 * @Date: 2019-08-18 01:00:28 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-18 01:39:18
 * 二分查找
 */

var arrayTest = [2, 3, 5, 7, 11, 13, 17];

/**
 * 递归二分查找
 * @param  {} target 目标值
 * @param  {} arr    查找的数组
 * @param  {} start  开始索引，默认0
 * @param  {} end    结束索引，默认arr.length-1
 */
var binarySearch_1 = function(target, arr, start, end) {
  var start = start || 0;
  var end = end || arr.length - 1;
  if (start > end) return -1;
  var mid = Math.floor((start + end) / 2);
  if (target === arr[mid]) {
    return mid;
  } else if (target > arr[mid]) {
    return binarySearch_1(target, arr, mid + 1, end);
  } else {
    return binarySearch_1(target, arr, start, mid - 1);
  }
}
/**
 * 非递归二分查找
 * @param  {} target
 * @param  {} arr
 * @param  {} start
 * @param  {} end
 */
var binarySearch_2 = function(target, arr, start, end) {
  var start = start || 0;
  var end = end || arr.length - 1;
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (arr[mid] > target) {
      end = mid - 1;
    } else if (arr[mid] === target) {
      return mid;
    } else {
      start = mid + 1;
    }
  }
  return `The Array do not have ${target}`;
}