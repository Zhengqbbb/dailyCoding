//原始类型
let bool: boolean = true;
let num: number = 123;
let str: string = 'abc';
// str = 123;

//数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
// let arr2: Array<number> = [1, 2, 3, '4'];
let arr3: Array<number | string> = [1, 2, 3, '4'];


//元组
let tuple: [number, string] = [0, '1'];

//函数
let add = (x: number, y: number): number => x + y;
let add_1 = (x: number, y: number) => x + y;//TS中的类型推断功能

let compute: (x: number, y: number) => number;//函数定义
compute = (a, b) => a + b;//函数的具体实现

//对象
let obj: object = { x: 1, y: 2 };
// obj.x = 3;
let obj_1: { x: number, y: number } = { x: 1, y: 2 };
obj_1.x = 3;

//symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2);//false


//undefined， null
let un: undefined = undefined;
let nu: null = null;
num = undefined;
num = null;

//void
let noReturn = () => {}

//any
let x;

//never