/*
 * @Author: qbenben 
 * @Date: 2019-10-09 21:30:03 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-10-09 21:54:06
 * 007-整数翻转
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 注意:
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 */


/**
 * 示例 1:
 * 输入: 123
 * 输出: 321
 * 示例 2:
 * 输入: -123
 * 输出: -321
 * 示例 3:
 * 输入: 120
 * 输出: 21
 * 
 * 首先，将传入的数字 x 转换成字符串，并分割成数组。
 * 然后，遍历该数组，将最后一个取出来放到 result 中。
 * 最后，判断这个 result 是否超过题目限制，如果超过则变成 0 。
 * @param  {} x 需要反转的整数
 */
var reverse_1 = function(x) {
  //转数组
  let numberToArray = String(Math.abs(x)).split('');
  //转字符串
  let result = '';
  for (const i = 0; i < numberToArray.length;) {
    result += numberToArray.pop();
  }
  result = x > 0 ? Number(result) : -Number(result);
  //超过处理
  if (result > Math.pow(2, 31) - 1 ||
    result < -Math.pow(2, 31)) {
    result = 0;
  }
  return result;
}

var testNumber = -1234
console.log(reverse_1(testNumber)); //-4321


/**
 * 使用数学解法：
 * 首先，我们初始化数值。
 * 然后，我们需要知道的是，一个数对 10 取余，可以得到这个数的个位数；一个数乘于 10 并加上一个个位数，可以将这个数字放到末尾。
 * 最后，我们判断一开始传入的数值正负，再返回对应结果即可。
 * @param  {} x需要反转的整数
 */
var reverse_2 = function(x) {
  let result = 0;
  let y = Math.abs(x);
  while (y != 0) {
    result = result * 10 + y % 10;
    y = Math.floor(y / 10);
    if (result > Math.pow(2, 31) - 1 ||
      result < -Math.pow(2, 31)) {
      result = 0;
      y = 0;
    }
  }
  return x > 0 ? result : -result;
}

console.log(reverse_2(testNumber)); //-4321