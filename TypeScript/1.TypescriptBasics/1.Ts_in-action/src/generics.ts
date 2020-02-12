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

//let myLog: Log<number> = log;


//泛型约束类的成员
class Log<T>{
  run(value: T){
    console.log(value);
    return value;
  }
}
//实例化的过程中显示传入类的类型
let log1 = new Log<number>()
log1.run(123);
let log2 = new Log();
//再不传入参数，就会变成any类型
log2.run('123');