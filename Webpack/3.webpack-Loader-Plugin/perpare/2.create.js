let obj = Object.create(null);
//原理：
if (!Object.create) {
  Object.create = function(proto) {
    function F() {}
    F.prototype = proto;
    return new F();//实例的__proto = proto
  }
}
//创建一个干净的obj
console.log(obj);
//console.log(obj.toString);//undefined
