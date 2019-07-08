/*
 * @Author: qbenben 
 * @Date: 2019-07-06 03:01:06 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-07-06 04:08:01
 * 不宜使用箭头函数
 */

//1.作为构造函数，一个方法需要绑定到对象
const Person = (name, points) => {
  this.name = name; //error
  this.points = points; //error
}
const Person = function (name, points) {
  this.name = name; //true
  this.points = points; //true
}

const Jelly = new Person('jelly', 5);
Person.prototype.updataPoints = () => {
  console.log(this); //Window
  this.points++; //error 
  console.log(this.points)
}
Person.prototype.updataPoints = function () {
  this.points++; //true
  console.log(this.points)
}

//2.当你真的需要this的时候
const button = document.querySelector('.zoom');
button.addEventListener('click', function () {
  //此时的this是button，使用箭头函数的话是Window
  this.classList.add('in');
  setTimeout(() => {
    //此时的this是父级作用域的button，若使用function则this是Window
    this.classList.remove('in')
  }, 2000);
})


//3.需要使用arguments对象
const sum = () => {
  return Array.from(arguments) //error 使用箭头函数是没有argument对象的
    .reduce((prevSum, value) => prevSum + value, 0)
}
//若你想在箭头函数中使用可以
const sum = (...args) => { //此时args是数组
  return args.reduce((prevSum, value) => prevSum + value, 0)
}

const sum = function () {
  return Array.from(arguments) //true
    .reduce((prevSum, value) => prevSum + value, 0)
}