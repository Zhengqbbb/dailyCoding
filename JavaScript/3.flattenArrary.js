/*
 * @Author: qbenben 
 * @Date: 2019-08-11 18:53:59 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-12 04:11:07
 * 数组扁平化 又叫 数组降维
 */

var a = [1, [2, ["a", { a: "1" }]]];

/**
 * 1、循环数组元素，若果还是数组，使用递归调用
 * @param  {} arr
 */
function flatten1(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}
console.log(flatten1(a));


/**
 * 2、如果数组的元素都是数字，那么我们可以考虑使用 toString 方法
 * [1, [2, [3, 4]]].toString() // "1,2,3,4"
 * @param  {} params
 */

var b = [1, [2, [3, 4]]]

function flatten2(arr) {
  return arr.toString().split(',').map((item) => {
    return +item;
  });
}
console.log(flatten2(b))


/**
 * 3、既然是对数组进行处理，最终返回一个值，我们就可以考虑使用 reduce 来简化代码：
 * @param  {} arr
 */
function flatten3(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten3(next) : next)
  }, []);
}

console.log(flatten3(a))


/**
 * 4、ES6 增加了扩展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：
 * @param  {} arr
 */
function flatten4(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

console.log(flatten4(a))