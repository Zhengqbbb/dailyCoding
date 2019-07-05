/**
 * 好处
 * 1.简明的语法
 * 2.可以隐式返回
 * 3.可以不绑定
 */
const numbers = [5, 6, 3, 2, 4]
const double = numbers.map(number => {
  return number * 2;
});
console.log(double)

const double2 = numbers.map((number,i) => {
  return `${i} : ${number * 2}`;
});
console.log(double2)

const double3 = numbers.map(() => {
  return 'hello'
});
console.log(double3)
/**
 * 隐式返回
 */
const double4 = numbers.map((number) => number * 2);
console.log(double4)