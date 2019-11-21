/*
 * @Author: Qbenben
 * @Date: 2019-11-19 21:07:22
 * @LastEditors: Qbenben
 * @LastEditTime: 2019-11-19 23:29:54
 * @Description: 771-宝石与石头(Gems and stones)
 * 
 * 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
 * J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
 * 
 * 示例 1:
 *  输入: J = "aA", S = "aAAbbbb"
 * 输出: 3
 * 
 * 示例 2:
 * 输入: J = "z", S = "ZZ"
 * 输出: 0
 */

var Jtest = 'aA';
var Stest = 'aAAbbbb';

/**
 * @description: 解法一：使用ES6方法filter加includes方法解；你的石头数组过滤里面不存在宝石类型的。并返回你拥有宝石的个数
 * @param {String} J 宝石的类型
 * @param {String} S 你拥有的一组石头
 * @return: 你拥有宝石的长度
 */
var numJewelsInStones_1 = function(J, S) {
  const jArr = J.split('');
  const sArr = S.split('');
  return sArr.filter(item => jArr.includes(item)).length;
};

console.log(numJewelsInStones_1(Jtest, Stest));

/**
 * @description: 解法二：使用Set集合加forof遍历；使用Set集合存储唯一的宝石类型，然后遍历你拥有的石头有则让个数加一，最后返回个数
 * @param {String} J 宝石的类型
 * @param {String} S 你拥有的一组石头
 * @return: 你拥有宝石的长度
 */
var numJewelsInStones_2 = function(J, S) {
  const jSet = new Set();
  let result = 0;
  for (const s of J) {
    jSet.add(s);
  }
  for (const s of S) {
    if (jSet.has(s)) {
      result++;
    }
  }
  return result;
};

console.log(numJewelsInStones_2(Jtest, Stest));