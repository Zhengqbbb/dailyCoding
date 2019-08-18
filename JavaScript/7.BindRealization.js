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
  var args = Array.prototype.slice.call(arguments, 1);
  var F = function() {};
  var bound = function() {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }
  F.prototype = this.prototype;
  bound.prototype = new F();
  return bound;
}