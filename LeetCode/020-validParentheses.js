/*
 * @Author: qbenben 
 * @Date: 2019-11-08 23:51:53 
 * @Last Modified by:   qbenben 
 * @Last Modified time: 2019-11-08 23:51:53 
 * 020 - 有效的括号
 */

var isValid = function(s) {
  let judge = {
    '[': ']',
    '(': ')',
    '{': '}',
  }
  let parameter = s.split('');
  let stack = [];
  for (let i = 0; i < parameter.length; i++) {
    if (judge[stack[stack.length - 1]] === parameter[i]) {
      stack.pop();
    } else {
      stack.push(parameter[i]);
    }
  }
  if (stack.length == 0) {
    return true;
  }
  return false;
};
