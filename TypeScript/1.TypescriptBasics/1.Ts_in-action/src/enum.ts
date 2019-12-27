//数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Developer);
console.log(Role);//打印为对象，既可以使用值索引，也可以使用数字索引

//字符串枚举
enum Message {
  Success = '恭喜你，你成功了',
  Fail = '抱歉，失败了'
}

//异构枚举
enum Answer {
  N,
  Y = 'Yes'
}

//枚举成员
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
  //computed
  d = Math.random(),
  e = '123'.length,
}

//常量枚举
const enum Moth {
  Jan,
  Feb,
  Mar,
}
let moth = [Moth.Jan, Moth.Feb, Moth.Mar];

//枚举类型
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3

let e1: E.a
let e2: E.b
let e3: E.a

let g1: G = G.b
let g2: G.a = G.a



