/*
 * @Author: qbenben 
 * @Date: 2019-11-08 23:51:53 
 * @Last Modified by:   qbenben 
 * @Last Modified time: 2019-11-08 23:51:53 
 * 020 - 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 */


/**
 * 遍历第一次，stack 末尾是空的，所以我们执行 push() 操作，stack：['(']
 * 遍历第二次，stack 末尾是 '('，通过 judge 转换就是 ')'，而在这个位置的 parameter[i] 是 '('，两者不相同，所以我们还是执行 push() 操作，stack：['(', '(']
 * 遍历第三次，stack 末尾是 '('，通过 judge 转换就是 ')'，而在这个位置的 parameter[i] 是 ')'，两者相同，所以我们执行 pop() 操作，将数组的末尾给删掉，stack：['(']
 * ……以此类推，最后我们的 stack 变成 [] 空数组。
 * @param  {} s  传入括号组成的字符串
 */
var isValid_1 = function(s) {
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

var _test_1 = '([)]';
var _test_2 = '(]';
var _test_3 = '{[]}';

console.log(isValid_1(_test_1));
console.log(isValid_1(_test_2));
console.log(isValid_1(_test_3));
