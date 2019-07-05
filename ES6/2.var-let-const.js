

/**
 * let const可以生成一个私有变量或者常量
 * var声明在外面是一个全局变量，这样很容易会污染到全局作用域，或者其他作用域
 */
var name = 'Jelly'
//此时会污染window属性中的name属性
//可以使用立即执行函数对name属性私有化
(function () {
  var name = 'Jelly'
  console.log(name)
})();
/**
 * 为了达到这个目的我们声明了一个函数
 * 而这个函数仅仅只是让这个变量私有化
 * 不利于可读性
 * 此时就可以用块级作用域
 */
{
  const name = 'Jelly'
  console.log(name)
}
{
  let name = 'Jelly1'
  console.log(name)
}

//还可以运用在for循环
for (var i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(function(){
    console.log(`i:${i}`)
  }, 1000);
}

/**
 * 为了解决这个问题我们就可以使用let来声明i
 * 这样i就可以块级作用域
 */
for (let i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(function(){
    console.log(`i:${i}`)
  }, 1000);
}


//需要注意的是：在let，const中虽然会把变量声明提升，但是存在临时性死区

function ai (a){
return a;
}