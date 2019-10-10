/*
 * @Author: qbenben 
 * @Date: 2019-10-10 23:29:12 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-10-10 23:40:47
 * 009-回文数
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 */


/**
 * 首先，我们将数字转成字符串，再转成数组。
 * 然后，我们循环遍历这个数组。
 * 接着，判断第 i 位和第 length - (i + 1) 位（例如 1231，第 0 位对应的是第 length - 1 位，第 1 位对应的是第 length - 2 位）。
 * 最后，如果循环判断没问题，就返回 true；如果循环判断有问题，直接在循环中 return false。
 * @param  {} x 输入需要校验是否为回文数的值
 */
var isPalidrome_1 = function(x) {
  const arr = String(x).split('');
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}


/**
 * 首先，可以想象：当一个数的长度为偶数，那么它对折过来应该是相等的；当一个数的长度是奇数，那么它对折过来后，有一个的长度需要去掉一位数（除以 10 并取整），因为奇数长度的那个数，我们不需要判断它中间的数字。
 * 定义传递过来的参数为：x，对折的数字为：z，而 y 为 x 目前的个位数。
 * 然后，需要知道如何获取到一个数的个位数：y = x % 10，我们也需要知道如何将单个数字不断添加到一个数的末尾：z = z * 10 + y，例如：z = 1 * 10 + 2 = 12。
 * 接着，只需要判断 x 是不是小于 z 了，毕竟当它小于的时候，说明数字已经对半或者过半了。
 * 最后，判断一开始的两种情况，并返回 true 或者 false 即可。
 * @param  {} x 输入需要校验是否为回文数的值
 */
var isPalidrome_2 = function(x) {
  if (x < 0 || (x % 10 == 0 && x != 0)) {
    return false;
  }
  let revertNumber = 0;
  while (x > revertNumber) {
    revertNumber = revertNumber * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return x === revertNumber || x === Math.floor(revertNumber / 10);
}

var testNumber = 12321;
//var testNumber = -12321;
//var testNumber = 1231;

console.log(isPalidrome_1(testNumber));
console.log(isPalidrome_2(testNumber));