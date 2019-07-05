/**
 * 函数参数的默认值
 */

 function multiply(a,b){
  a = a || 5;
  b = b || 3;
  return console.log(a * b);
 }
 multiply(1,2)
 multiply()

//es6
function multiply2(a=5,b=3){
  return console.log(a * b);
}
multiply2(1,2)
multiply2()