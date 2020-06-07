/*
 * @Author: Qbenben
 * @Date: 2020-01-02 23:57:27
 * @LastEditors  : Qbenben
 * @LastEditTime : 2020-02-02 19:49:48
 * @Description: 058 - 最后一个单词的长度（length-of-last-word）
 * 
 * 给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。
 * 如果不存在最后一个单词，请返回 0 。
 * 
 * 说明：一个单词是指由字母组成，但不包含任何空格的字符串。
 * 
 * 示例:
 * 输入: "Hello World"
 * 输出: 5
 */



var lengthOfLastWord_1 = function(s) {
  // 防止 'b   a  cc' 的情况，去掉多余空格（去重）
  const result = [...new Set(s.split(' '))];
  // 防止 'a  ' 的情况
  if (result.length >= 2 && result[result.length - 1] === '') {
    return result[result.length - 2].length
  }
  return result[result.length - 1].length
};