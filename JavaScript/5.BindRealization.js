/*
 * @Author: qbenben 
 * @Date: 2019-08-15 23:44:48 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-18 16:27:53
 * 手写bind
 */

Function.prototype.bind2 = function(context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  var F = function() {};

  var Bound = function() {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof F ? this : context, args.concat(bindArgs));
  }

  F.prototype = this.prototype;
  Bound.prototype = new F();
  return Bound;
}