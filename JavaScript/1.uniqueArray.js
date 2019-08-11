/*
 * @Author: qbenben 
 * @Date: 2019-08-11 17:19:31 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-11 18:19:45
 * 数组去重的方式
 */
var a = [3, 62, 3, 38, 20, 42, 14, 5, 38, 29, 42];


/**
 * 1、第一种方式：使用ES6的Set去重
 * 优点：代码简洁，速度快，时间复杂度为O(N)
 * 缺点：需要一个额外的Set和Array的存储空间，空间复杂度为O(N)
 * @param  {} arr 需要去重的数组
 */

function uniqueArray1(arr) {
  return [...new Set(arr)];
}
console.log(uniqueArray1(a));

/**
 * 2、第二种方式： 使用splice
 * 优点：不需要使用额外的存储空间，空间复杂度为O(1)
 * 缺点：需要频繁的内存移动，双重循环，时间复杂度为O(N2)
 * @param  {} arr
 */
function uniqueArray2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
}
console.log(uniqueArray2(a));




/**
 * 3、第三种方式利用indexOf()方法
 * 时间复杂度为O(N2)，空间复杂度为O(N)
 * @param  {} arr
 */
function uniqueArray3(arr) {
  var retArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (retArr.indexOf(arr[i]) === -1) {
      retArr.push(arr[i]);
    }
  }
  return retArr;
}
console.log(uniqueArray3(a));

/**
 * 3、第四种方式 利用Object的hastable键是唯一的去重
 * 时间复杂度为O(N)，空间复杂为O(N).
 * @param  {} arr
 */
function uniqueArray4(arr) {
  let retArr = [];
  let hash = {};
  arr.forEach(item => {
    if (!hash[item]) {
      retArr.push(item);
      hash[item] = true;
    }
  });
  return retArr;
}

console.log(uniqueArray4(a));