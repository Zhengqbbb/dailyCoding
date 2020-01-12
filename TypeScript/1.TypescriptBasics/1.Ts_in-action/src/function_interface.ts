//可以用一个变量来定义一个函数类型
//let add1: (x: number, y: number) => number;

//也可以用一个接口来定一个函数类型,与上方等价
/* interface Add {
  //定义参数类型
  (x: number, y: number): number;
} */

//还可以使用类型别名type关键字
type Add = (x: number, y: number) => number;

//实现具体函数
let add1: Add = (a, b) => a + b;

/* --------------混合类型------------- */
//使用混合类型定义一个类库
interface Lib {
  //假设这个lib是一个函数没有返回值和参数
  (): void;
  //增加属性
  version: string;
  //添加方法
  doSomething(): void;
}

//实现一个接口,并且使用类型断言，因为我们明确知道这个lib就是我们的接口类型
/* let lib: Lib = (() => {}) as Lib;
lib.version = "1.0";
lib.doSomething = () => {}; */
//可是这样我们就只能创建一个单例
//此时我们需要用一个函数进行封装
function getLib(){
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}

let lib1 = getLib();
let lib2 = getLib();

lib1();
lib1.doSomething();

