/*
 * @Author: Qbenben
 * @Date: 2020-02-02 19:55:39
 * @LastEditors  : Qbenben
 * @LastEditTime : 2020-02-02 20:09:17
 * @Description: 067 - 二进制求和（add-binary）
 * 
 * 给定两个二进制字符串，返回他们的和（用二进制表示）。
 * 输入为非空字符串且只包含数字 1 和 0。
 * 
 * 示例 1:
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 
 * 示例 2:
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 */

var testNum1 = ['1', '1', '1'];
var testNum2 = ['1'];
/**
 * @description: 二进制之和 数学算法
 * @param {Array} a 二进制数组
 * @param {Array} b 二进制数组
 * @return {Number} result a和b的和（用二进制表示）
 */
var addBinary = function(a, b) {
  let carry = 0, // 进位标记
    res = [],
    aIndex = a.length - 1,
    bIndex = b.length - 1;
  while (aIndex >= 0 || bIndex >= 0) { // a 或 b 还有位可以相加
    sum = (+a[aIndex] || 0) + (+b[bIndex] || 0) + carry; // aIndex bIndex可能为负数值，需要转化为 0
    carry = sum >= 2 ? 1 : 0;
    res.push(sum % 2);
    aIndex--;
    bIndex--;
  }
  if (carry) {
    res.push(1);
  }
  return res.reverse().join('');
}

console.log(addBinary(testNum1, testNum2));