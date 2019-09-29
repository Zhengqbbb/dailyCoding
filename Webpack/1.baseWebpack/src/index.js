//webpack默认支持 模块写法 commonjs规范(node)
//es6语法 esmodule

//let result = require('./a-module.js')
//console.log(result);

//css
//import './style/index.css';

//引入图片
//import logo from '../src/img/logo.png';
//let img = document.createElement('img');
//img.src = logo;
//document.body.appendChild(img);

//es6转换为es5
//const fn = ()=>{}
//fn()

//高级一点的语法 npm i @babel/plugin-proposal-class-properties -D
/* @log
class A{
  a = 1;
}

function log(target) {  

} */
/* 
相当于：
class A {
  constructor(){
    this.a = 1;
  }
}
*/


//默认不能转换高级语法，实例上的语法 promise
//[1, 2, 3].includes(1);

import './a'
class A {

}