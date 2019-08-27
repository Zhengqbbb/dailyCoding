/*
 * @Author: qbenben 
 * @Date: 2019-08-18 18:02:01 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-18 18:16:38
 * 数组乱序
 */

var arrTest = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

//----------------------数组乱序（简单）------------------
var shuffle_1 = function(a, b) {
  return Math.random() > .5 ? 1 : -1;
}
console.log(arrTest.sort(shuffle_1));

//----------------------数组乱序------------------

var shuffle_2 = function(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var rdIndex = Math.floor(Math.random() * (len - i));
    var temp = arr[rdIndex];
    arr[rdIndex] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}
console.log(shuffle_2(arrTest));