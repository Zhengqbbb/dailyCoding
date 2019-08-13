/*
 * @Author: qbenben 
 * @Date: 2019-08-13 15:35:38 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-13 17:20:12
 * JavaScript各种继承方式和优缺点。
 */

//============= 1、原型链继承 ================
/**
 * 缺点：
 * 引用类型的属性被所有实例共享
 * 在创建 Child 的实例时，不能向Parent传参
 */
function Parent1() {
  this.name = 'qbenben';
}

Parent1.prototype.getName = function() {
  console.log(this.name);
}

function Child1() {

}
Child1.prototype = new Parent1();
var child1 = new Child1();
//console.log(child1.getName()); //qbenben

//============= 2、借用构造函数(经典继承) ================
/**
 * 缺点：
 * 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * @param  {} name
 */
function Parent2(name) {
  this.name = name;
}

function Child2(name) {
  Parent2.call(this, name);
}

var child2 = new Child2('qbenben');
//console.log(child2.name);
var child2_1 = new Child2('zzzz');
//console.log(child2_1.name);


//============= 3、组合继承(原型链继承和经典继承双剑合璧) ================
/**
 * 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
 * @param  {} name
 */
function Parten3(name) {
  this.name = name;
  this.colors = ['red', 'bule']
}

Parten3.prototype.getName = function(name) {
  console.log(this.name);
}

function Child3(name, age) {
  Parten3.call(this, name);
  this.age = age;
}

Child3.prototype = new Parten3();
Child3.prototype.constructor = Child3;

var child3 = new Child3('qbenben', '18');
child3.colors.push('black');

//console.log(child3.name); //qbenben
//console.log(child3.age); //18
//console.log(child3.colors) //[ 'red', 'bule', 'black' ]

var child3_1 = new Child3('zzzzzzz', '22');

//console.log(child3_1.name); // zzzzzzz
//console.log(child3_1.age); // 22
//console.log(child3_1.colors); // [ 'red', 'bule' ]


//============= 4、原型式继承(ES5 Object.create) ================
/**
 * 将传入的对象作为创建的对象的原型。
 * 缺点：
 * 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
 */
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var Person = {
  name: 'qbenben',
  colors: ['dack', 'red']
}

var person1 = createObj(Person);
var person2 = createObj(Person);

person1.name = '123';
//console.log(person2.name);

person1.colors.push('white');
//console.log(person2.colors);
/* 
注意：修改person1.name的值，person2.name的值并未发生改变，
并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，
给person1添加了 name 值，并非修改了原型上的 name 值。 */




//============= 5、寄生式继承 ================
/**
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
 * 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 * @param  {} o
 */
function createObj_1(o) {
  var clone = Object.create(o);
  clone.sayName = function() {
    console.log('hi');
  }
  return clone;
}


//============= 6、寄生组合式继承 ================
//间接的让 子类.prototype 访问到 父类.prototype 

// ------实现------
function Parent4(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent4.prototype.getName = function() {
  console.log(this.name);
}

function Child4(name, age) {
  Parent4.call(this, name);
  this.age = age;
}
// 关键的三步

var F = function() {};
F.prototype = Parent4.prototype;
Child4.prototype = new F();

//var child4 = new Child4('qbenben', '18');
//console.log(child4);



//我们来封装一下上面的几个步骤
function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

//使用
prototype(Child4, Parent4)