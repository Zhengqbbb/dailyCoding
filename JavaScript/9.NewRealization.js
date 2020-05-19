/*
 * @Author: Qbenben
 * @Date: 2020-03-22 02:06:03
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-03-31 21:27:02
 * @Description: New 的实现
 */

function _new() {
  //创建一个空对象
  let obj = new Object();
  //得到一个构造函数
  let Con = [].shift.call(arguments);
  //原型链绑定
  obj.__proto__ = Con.prototype;
  //构造函数的执行同时借用外部传入的构造器给obj设置属性
  let result = Con.apply(obj, arguments);
  //判断new出来的是不是一个对象
  return typeof result === 'object' ? result : obj;
}