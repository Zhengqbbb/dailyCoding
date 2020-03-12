/*
 * @Author: qbenben 
 * @Date: 2019-08-11 19:11:10 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-12 18:46:59
 * 浅拷贝和深拷贝
 */

//--------------最简单的浅拷贝：拷贝原对象的引用-----------------
//基本数据类型 a,b指向不同的数据
var a1 = 1;
var b1 = a1;

a1 = 2;
console.log(a1, b1)

//引用数据类型，会导致a b指向同一份数据，
//此时如果对其中一个进行修改，就会影响另一个。俗称浅拷贝
var a2 = { c2: 2 };
var b2 = a2;
a2.c2 = 4;
console.log(a2, b2);

//------------浅拷贝：拷贝原对象的实例-------------
//常用的就是如jquey中的$.extend({}, obj); Array.prototype.slice()和Array.prototype.concat()
//都会返回一个数组或者对象的浅拷贝， 举个例子：
var o1 = ['drako', { age: 22 }];
var o2 = o1.slice();
console.log(o1 === o2); // => false，说明o2拷贝的是o1的一个实例
o2[0] = 'lee';
console.log(o1[0]); // => "darko" o1和o2内部包含的基本类型值，复制的是其实例，不会相互影响
o2[1].age = 23;
console.log(o1[1].age); // =>23 o1和o2内部包含的引用类型值，复制的是其引用，会相互影响


/**
 * 浅拷贝函数
 * @param  {} source
 */
function shallowClone(source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments')
  }
  let targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}

//--------------深拷贝----------------

const obj = {
  arr: [111, 222],
  obj: { key: '对象' },
  a: () => { console.log('函数') },
  date: new Date(),
  reg: /正则/ig
}

/**
 * 深拷贝，利用JSON，obj中的普通对象和数组都能拷贝
 * 弊端：Date变成字符串，方法直接消失，正则为空
 * @param  {} source
 */
function cloneJSON(source) {
  return JSON.parse(JSON.stringify(source));
}






/**
 * 通过浅拷贝方法递归————无法拷贝函数，date，reg类型的对象
 * 因为：在序列化JavaScript对象时，所有函数和原型成员会被有意忽略
 * @param  {} source
 */
function deepClone(source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments')
  }
  let targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

console.log(deepClone(obj))

/**
 * @description: 深拷贝遇到正则或者日期类型时实现的深拷贝
 * @param {obj} Object 
 * @return: 
 */
function deepClone_1(obj, hash = new WeakMap()){
  if(obj instanceof RegExp)return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);
  if(obj === null||typeof obj !== 'object'){
    //如果不是复杂数据类型，直接返回
    return obj;
  }
  if(hash.has(obj)){
    return hash.get(obj);
  }
  /**
   * 如果obj是数组，那么obj.constructor 是 [Function: Array]
   * 如果obj是对象，那么obj.constructor 是 [Function: Object]
   */
  let t = new obj.constructor();
  for(let key in obj){
    //递归
    if(obj.hasOwnProperty(key)){
      t[key] = deepClone_1(obj[key], hash);
    }
  }
  return t;
}

console.log(deepClone_1(obj));