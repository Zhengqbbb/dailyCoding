//js中的this是在运行中才绑定的
/**
 * 箭头函数中没有自己的this值
 * 他的this值是从父级作用域继承下来的
 * 
 */
const Jelly = {
  name: 'Jelly',
  habbies:['Coding','Sleeping','Reading'],
  printHobbies: function(){
    console.log(this)
    this.habbies.map(hobby=>{
      console.log(this)
      console.log(`${this.name} loves ${hobby}`)
    })
  }
}

Jelly.printHobbies();