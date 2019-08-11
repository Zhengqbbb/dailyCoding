/*
 * @Author: qbenben 
 * @Date: 2019-08-11 18:49:20 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-11 18:51:39
 * 递归的常见练习
 */

/**
 * 大数阶乘
 * @param  {} n 需要阶乘的数字
 */
function factorial(n) {
  return n > 1 ? n * factorial(n - 1) : 1;
}
console.log(factorial(10));