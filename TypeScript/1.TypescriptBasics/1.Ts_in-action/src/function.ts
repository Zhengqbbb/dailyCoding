//函数的定义
function addFunction1(x: number, y: number) {
  return x + y;
}

let addFunction2: (x: number, y: number) => number;

type addFunction3 = (x: number, y: number) => number;

interface addFunction4 {
  (x: number, y: number): number;
}

//可选参数

function addFunction5(x: number, y?: number) {
  return y ? x + y : x;
}

//给参数一个默认值

function addFunction6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q;
}

//剩余参数

function addFunction7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}

//函数重载

function addFunction8(...rest: number[]): number;
function addFunction8(...rest: string[]): string;
function addFunction8(...rest: any[]): any{
  let first = rest[0];
  if(typeof first ==='string'){
    return rest.join('')
  }
  if(typeof first === 'number'){
    return rest.reduce((pre,cur)=>  pre+ cur);
  }
}
