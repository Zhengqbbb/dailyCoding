/*
 * @Author: Qbenben
 * @Date: 2020-03-11 23:04:11
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-03-12 18:14:15
 * @Description: 函数柯里化
 * 参数复用
 * 提前返回 – 返回接受余下的参数且返回结果的新函数
 * 延迟执行 – 返回新函数，等待执行
 */

function add(a, b, c, d) {
  return a + b + c + d;
}

//一行代码实现函数柯里化
const curry = (fn, ...args) =>
  args.length < fn.length ?
  //参数长度不足时，重新柯里化函数，等待接受新的参数
  (...arguments) => curry(fn, ...args, ...arguments) :
  //参数长度满足时，执行函数
  fn(...args);

console.log(curry(add)(2, 3)(4)(5));

//---------类型一：参数数量满足函数参数要求时，触发执行---------
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
  };
};
/**
 * @description: ES5写法
 */
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
  };
}

// const curryAdd = createCurry_1_2(add, 2);
// let sum = curryAdd(3)(4)(5);
// console.log(sum);

//---------类型二：当无参数传入时并且参数的数量已经满足函数要求触发
/**
 * @description: ES6写法
 */

const createCurry_2_1 = (fn, ...args) => {
  let all = args || [];
  let length = fn.length;
  return (...rest) => {
    let _allArgs = all.slice(0);
    _allArgs.push(...rest);
    if (rest.length > 0 || _allArgs.length < length) {
      //调用时参数不为空或者存储的参数不满足原始函数参数数量时
      return createCurry_2_1.call(this, fn, ..._allArgs)
    } else {
      //调用参数为空，并且参数的数量满足时，触发执行
      return fn.apply(this, _allArgs);
    }
  };
};

/**
 * @description: ES5写法
 */
function createCurry_2_2() {
  var fn = arguments[0];
  var _args = [].slice.call(arguments, 1);
  var length = fn.length;

  return function() {
    var _allArgs = _args.slice(0);
    _allArgs = _allArgs.concat([].slice.call(arguments));
    if (arguments.length > 0 || _allArgs.length < length) {
      _allArgs.unshift(fn);
      return createCurry_2_2.apply(this, _allArgs);
    } else {
      return fn.apply(this, _allArgs);
    }
  }
}