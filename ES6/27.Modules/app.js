/*
 * @Author: qbenben 
 * @Date: 2019-07-11 16:35:07 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-07-12 13:37:10
 * 入口文件
 */
import { uniq } from 'loadsh';
import moment from 'moment';
import User, { createURL } from './src/user'

/* import { apiKey, age, consoleName } from './config'
console.log(apiKey);
console.log(age);
consoleName('qbenben'); */

/* const arr = [1, 2, 22, 22, 122, 122, 7, 8, 9]
//去重
console.log(uniq(arr)); */
//npm istall webpack --save-dev
//npm install --save-dev babel-loader @babel/core

//创建一个user实例
const codecasts = new User('codecasts', 'i@codecasts.com');

console.log(codecasts);

const profile = createURL(codecasts.name);
console.log(profile);