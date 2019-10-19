/*
 * @Author: qbenben 
 * @Date: 2019-10-19 23:01:03 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-10-19 23:15:48
 * 014-最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 * 示例 1:
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * 示例 2:
 * 
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。说明:
 * 所有输入只包含小写字母 a-z 。
 */


/**
 * 解法一：暴力破解
 * 
 * @param  {} strs
 */
var longestCommonPrefix_1 = function(strs) {
  if (!strs.length) {
    return '';
  }
  let shortStrLength = strs[0].length; // 最短字符串的长度
  let shortStrPosition = 0; // 最短字符串的位置
  for (let i = 0; i < strs.length; i++){
    if (strs[i].length < shortStrLength) {
      shortStrLength = strs[i].length;
      shortStrPosition = i;
    }
  }
  let result = [];
  for (let i = 0; i < shortStrLength; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (strs[shortStrPosition][i] != strs[j][i]) {
        return result.join('');
      }
      if (j === strs.length - 1) {
        result[i] = strs[shortStrPosition][i];
      }
    }
  }
  return result.join('');
};



var test_ = ["flower", "flow", "flight"];
console.log(longestCommonPrefix_1(test_));