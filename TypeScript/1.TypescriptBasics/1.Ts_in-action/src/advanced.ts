/*
 * @Author: Qbenben
 * @Date: 2020-02-17 23:37:50
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-02-17 23:37:52
 * @Description: 索引类型
 */
let obj = {
  a: 1,
  b: 2,
  c: 3
};

/**
 * @description: 将对象的值转换为数组
 *先把obj定义为泛型T，K继承并且索引T，
 * @param {obj}
 * @return:  keys
 */
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}
console.log(getValues(obj, ["a", "b"]));
console.log(getValues(obj, ["e", "f"]));

//keyof T
interface Obj {
  a: number;
  b: string;
}

let key: keyof Obj;

//T[K]
let value: Obj["a"];
//T extends U
