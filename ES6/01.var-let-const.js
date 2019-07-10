/**
 * var 是可以重复定义的
 * 但是var可能导致重复定义，这个时候就可以使用let const
 * 因为let const 是不能在一个作用域中重复使用的
 */
var price = 100;
var price = 200;
console.log(price)

var count = 10;
if(count > 5){
  let discount = count * 6;
  console.log(`this discount is ${discount}`);
}
// 无法输出 console.log(discount)


let age = 20;
console.log(age)
const id = 'abc123';
// 无法重新赋值 const id = '123'
console.log(id)

const person = {
  name: 'qbenben',
  age:'20'
}
person.age = '21';
console.log(person)
//说明const定义一个对象的时候里面的对象属性是可以改变的，因为改变了对象的指向
//就不是同一个对象了，如果不想其更新可以以下的方法
const Jelly = Object.freeze(person);
console.log(Jelly);
Jelly.age = '22';
console.log(Jelly);