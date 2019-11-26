
TypeScript基础篇：极客时间TypeScript开发实战（[梁宵](梁宵)）学习笔记。
===

## 01.“类型思维” 

* JavaScript 是一门动态弱类型语言，对变量的类型非常宽容。而TypeScript提供静态类型检查。
*  TypeScript是拥有类型系统的JavaScript的超集，可以编译为纯JavaScript。
* TypeScript有三个特点：

<p>1.类型检查：会在编译代码时进行严格的静态类型检查，可以再编码阶段发现可能存在的隐患，而不必把他们带到线上去<br>2.语言扩展：TypeScript会包括ES6，以及未来提案中的特性，比如异步操作和装饰器，也会从其他语言借鉴某些特性，比如接口和抽象类<br>3.工具特性：TypeScript可以编译成标准的JavaScript可以再任何浏览器和操作系统上运行</p>

* 使用TypeScript还能带来什么其他好处：比如Vscode自动补全，导航和重构功能，接口定义可以代替文档，同时也能提高开发效率。

## 02.强类型和弱类型
* JavaScript是一门动态弱类型语言。
* 强类型语言：不允许改变变量的数据类型，除非进行强制类型转换。
* 弱类型语言：变量可以被赋予不同的数据类型。
* 总结：在强类型语言中对变量类型有严格的要求，不同的变量是不能相互赋值的。
而弱类型语言则没有什么约束，虽然相对灵活，但是也更容易产生Bug。

##  03.静态类型语言和动态类型语言
* 静态类型语言通俗定义：在编译阶段确定所有变量的类型。
* 动态类型语言通俗定义：在执行阶段确定所有变量的类型。
* 总结：两者的好处坏处都是两面的不能一概而论，要具具体的情况而定<br>

|静态类型语言|动态类型语言|
|---|---|
|对类型极度严格|对类型非常宽松|
|立即发发现错误|Bug可能隐藏数月甚至数年|
|运行时性能好(时间和空间上)|运行时性能差(时间和空间上)|
|自文档化|可读性差|

## 04.编写TypeScript
* 使用npm命令初始化工程：

```bash
npm init -y
npm i typescript -g
tsc --init          //初始化
tsc ./src/index.ts  //编译
```

* 配置构建工具： webpack

<code>npm i webpack webpack-cli webpack-dev-server</code><br>
<code>npm i ts-loader typescript -D</code><br>
<p>并且在build文件夹中将<b>webpack.base.config.js</b>，<b>webpack.config.js</b>，<b>webpack.dev.config.js</b>，<b>webpack.pro.config.js</b>文件都配置好</p>

* 配置npm命令：

<code>"start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
</code><br>
<code>"build": "webpack --mode=production --config ./build/webpack.config.js",</code>