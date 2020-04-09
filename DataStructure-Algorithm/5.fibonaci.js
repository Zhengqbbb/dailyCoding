/*
 * @Author: Qbenben
 * @Date: 2020-04-10 00:24:13
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-04-10 00:51:59
 * @Description: 斐波那契数列求和
 */

/**
 * @param {number} n 
 */
function fibonaci_1(n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fibonaci_1(n - 1) + fibonaci_1(n - 2);
}


/**
 * @description: memoization是一种将函数执行结果用变量缓存起来的方法。
 * 当函数进行计算之前，先看缓存对象中是否有次计算结果，
 * 如果有，就直接从缓存对象中获取结果；
 * 如果没有，就进行计算，并将结果保存到缓存对象中。
 * @param {type} 
 * @return: 
 */
let fibonaci_2 = (function() {
  let memory = [];
  return function(n) {
    if (memory[n] !== undefined) {
      return memory[n]
    }
    return memory[n] = (n === 0 || n === 1) ? n : fibonaci_2(n - 1) + fibonaci_2(n - 2);
  }
})()


let fibonaci_3 = (function() {
  let memory = {};
  return function(n) {
    if (n === 0 || n === 1) {
      return n;
    }
    if (memory[n - 2] === undefined) {
      memory[n - 2] = fibonaci_3(n - 2);
    }
    if (memory[n - 1] === undefined) {
      memory[n - 1] = fibonaci_3(n - 1);
    }
    return memory[n] = memory[n - 1] + memory[n - 2];
  }
})()

/**
 * @description: 尾递归
 */
const Fibonacci_4 = (n, sum1 = 1, sum2 = 1) => {
  if (n <= 1) return sum2;
  return Fibonacci(n - 1, sum2, sum1 + sum2)
}

/**
 * @description: 动态规划
 */
const F = (n) => {
  let a = 0;
  let b = 1;
  let i = 1;
  while (i++ <= n) {
    [a, b] = [b, a + b]
  }
  return a;
}