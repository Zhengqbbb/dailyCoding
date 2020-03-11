/*
 * @Author: Qbenben
 * @Date: 2020-03-11 23:04:11
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-03-11 23:19:38
 * @Description: 函数柯里化
 */


function add(a, b, c, d) {
  return a + b + c + d;
}
//---------类型一：参数数量满足函数参数要求时，触发执行
/**
 * @description: ES6写法
 */
const createCurry_1_1 = (fn, ...args) => {
  let _args = args || [];
  let length = fn.length; //fn.length

  return (...rest) => {
    let _allArgs = _args.slice(0);
    _allArgs.push(...rest);
    if (_allArgs.length < length) {
      return createCurry_1_1.call(this, fn, ..._allArgs);
    } else {
      return fn.apply(this, _allArgs);
    }
  }
}

function createCurry_1_2() {
  var fn = arguments[0];
  var _args = [].slice.call(arguments, 1);
  var length = fn.length;

  return function() {
    var _allArgs = _args.slice(0);
    _allArgs = _allArgs.concat([].slice.call(arguments));
    if (_allArgs.length < length) {
      _allArgs.unshift(fn);
      return createCurry_1_2.apply(this, _allArgs);
    } else {
      return fn.apply(this, _allArgs);
    }
  }
}

const curryAdd = createCurry_1_2(add, 2);
let sum = curryAdd(3)(4)(5);
console.log(sum);