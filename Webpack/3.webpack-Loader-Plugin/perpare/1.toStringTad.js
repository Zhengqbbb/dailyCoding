console.log(Object.prototype.toString.call({name: 'qbenben'}));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(10));
console.log(Object.prototype.toString.call(true));
//改变prototype
let useExports = {};
Object.defineProperty(useExports, Symbol.toStringTag, {value: 'qbenben'});
console.log(Object.prototype.toString.call(useExports));