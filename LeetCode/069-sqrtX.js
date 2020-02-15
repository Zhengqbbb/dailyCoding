/*
 * @Author: Qbenben
 * @Date: 2020-02-15 23:57:50
 * @LastEditors  : Qbenben
 * @LastEditTime : 2020-02-15 23:59:12
 * @Description: 069 - x 的平方根（sqrtx）
 * 
 * 实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:
输入: 4
输出: 2

示例 2:
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
 */


/**
 * @description:解法 - JS API 
 * @param {x} 
 * @return: 
 */
var mySqrt_1 = function(x) {
  return Math.floor(Math.sqrt(x));
};

/**
 * @description:解法 - 暴力破解
 * @param {type} 
 * @return: 
 */
var mySqrt_2 = function(x) {
  if (x === 0 || x === 1) {
    return x;
  }
  for (let i = 0; i < x; i++) {
    if (i * i <= x && (i + 1) * (i + 1) > x) {
      return i;
    }
  }
};

/**
 * @description: 解法 - 二分查找
 * @param {type} 
 * @return: 
 */
var mySqrt_3 = function(x) {
  if (x === 0 || x === 1) {
    return x;
  }
  let left = 1;
  let right = x;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (middle * middle > x) {
      right = middle;
    }
    if (middle * middle < x) {
      left = middle;
    }
    if (middle * middle === x) {
      return middle;
    }
    if (left === right - 1 && left * left <= x && right * right >= x) {
      return left;
    }
  }
};