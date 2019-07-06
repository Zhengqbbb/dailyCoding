/*
 * @Author: qbenben 
 * @Date: 2019-07-06 03:25:58 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-07-06 04:05:11
 * ES6中模板字符串
 */

const person = 'Jelly';
const age = 18;
const sentence = person + ' is ' + age + ' years old';
const sentence1 = `${person} is ${age * 5} years old`;
console.log(sentence);
console.log(sentence1);

const template = `
<div class = "qben">
  <p>hello</p> 
</div>
`;
console.log(template)


const template1 = `
<div class = "qben">
  <p>hello</p> 
</div>
`.trim();
console.log(template1)