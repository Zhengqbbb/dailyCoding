/*
 * @Author: qbenben 
 * @Date: 2019-10-19 23:01:03 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-10-22 22:55:06
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
 * 首先，我们进行非空判断，当它是 [''] 这样子时，我们直接返回 ''。
 * 然后，我们进行第一次遍历，我们需要获取到最短字符串，因为这样我们就可以进行最短的 for 遍历；我们顺带存储下位置，方便获取这个字符串。
 * 接着，我们进行双重遍历（第二/第三次遍历），将最短字符串的每个字符和其他字符串进行比对，正常情况下，我们找到不相同后，就返回结果。
 * 最后，如果我们第二/第三次遍历没有做到执行，我们返回空字符串即可。
 * @param  {} strs
 */
var longestCommonPrefix_1 = function(strs) {
  if (!strs.length) {
    return '';
  }
  let shortStrLength = strs[0].length; // 最短字符串的长度
  let shortStrPosition = 0; // 最短字符串的位置
  for (let i = 0; i < strs.length; i++) {
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


/**
 * 解法二： 水平扫描
 * @param  {} strs
 */
var longestCommonPrefix_2 = function(strs) {
  if (strs.length < 2) {
    return !strs.length ? '' : strs[0];
  }

  var result = strs[0];

  for (let i = 0; i < result.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (result[i] !== strs[j][i]) {
        return result.substring(0, i);
      }
    }
  }
  return result;
}

/**
 * 解法三： 正则表达式
 * 
 * 首先，我们跟前两种方法一样进行空数组和数组长度为 1 时的判断。
 * 然后，我们将数组第一个字符串通过 shift() 的形式给裁剪出来。
 * 接着，我们将数组以 @ 的形式拼接成字符串。因为下面我们将通过 @ 的形式来判断代码是否符合正则校验。
 * 再然后，通过 for 循环和正则表达式判断，如果成立了，下次再判断的时候，就通过字符串拼接的形式，拓展校验规则字段 regx。
 * 最后，如果匹配返回的长度和数组总长度相等的情况下，我们就通过字符串拼接的形式修改返回值。
 * @param  {} str
 */
var longestCommonPrefix_3 = function(str) {
  if (strs.length < 2) {
    return !strs.length ? '' : strs[0];
  }

  let base = strs.shift(),
    joinStrs = '@' + strs.join('@'),
    regx = '@',
    res = '';

  for (let i = 0; i < base.length; i++) {
    regx += base.substring(i, i + 1);
    let matchArr = joinStrs.match(new RegExp(`${regx}`, "g")) || [];
    if (matchArr.length === strs.length) {
      res += base.substring(i, i + 1);
    }
  }
  return res;
}



/**
 * 首先，这无疑是这四种思路中，写法看起来最简洁的。
 * 然后，通过 reduce()，我们可以进行一项累加操作：先比较第一项和第二项，然后找到它们共通值后，剪切并 return；再比较的时候，使用 return 出来的值和第三项进行比较……依次类推
 * 最后，返回最后一次 return 的值。
 * @param  {} str
 */
var longestCommonPrefix_4 = function(str) {
  if (strs.length < 2) {
    return !strs.length ? '' : strs[0];
  }

  return strs.reduce((prev, next) => {
    let i = 0;
    while (prev[i] && next[i] && prev[i] === next[i]) {
      i++;
    };
    return prev.slice(0, i);
  });
}