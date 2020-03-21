/*
 * @Author: Qbenben
 * @Date: 2020-03-22 02:06:03
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-03-22 02:10:50
 * @Description: New 的实现
 */

function _new() {
  //创建一个空对象
  let obj = new Object();
  //得到一个构造函数
  let Con = [].shift.call(arguments);
  //原型链绑定
  obj.__proto__ = Con.prototype;
  //构造函数的执行
  let result = Con.apply(obj, arguments);
  //判断new出来的是不是一个对象
  return typeof result === 'object' ? result : obj;
}