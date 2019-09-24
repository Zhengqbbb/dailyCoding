//webpack默认支持 模块写法 commonjs规范(node)
//es6语法 esmodule

//let result = require('./a-module.js')
//console.log(result);

//css
import './style/index.css';

//引入图片
import logo from '../src/img/logo.png';
let img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);