//T不需要预先指定是any类型，另外他也保证我们参数和返回值是一致的

function log<T>(value: T): T {
  console.log(value);
  return value;
}

//第一种调用方式
log<string[]>(["a", "b"]);

//第二种调用方式,使用TS的类型推断
log(["a", "b"]);

//第二种实现的方式：使用类型别名
// type Log = <T>(value: T) => T;
// let myLog: Log = log;

//泛型接口,可以定默认类型：
interface Log<T = string> {
  (value: T): T;
}

let myLog: Log<number> = log; 
