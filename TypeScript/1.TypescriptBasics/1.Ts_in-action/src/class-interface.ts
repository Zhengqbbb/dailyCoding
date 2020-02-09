//类类型接口
interface Human {
  name: string;
  eat(): void;
}
//实现接口
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() {
    console.log("eat meat");
  }
}

//类的继承
interface Man extends Human {
  run(): void;
}

interface Child extends Human {
  cry(): void;
}

interface Boy extends Man, Child {}
//实现Boy接口
let boy: Boy = {
  name: "",
  run() {},
  eat() {},
  cry() {}
};

//接口继承类，相当于接口把成员都抽象了出来，也就是只有类的成员结构，而没有具体的实现
class Auto {
  state = 1;
}

interface AutoInterface extends Auto {
  //隐含了state属性
}

class C implements AutoInterface {
  state = 1;
}

class Bus extends Auto implements AutoInterface{
  //不必实现state属性，因为他是Auto的子类自然继承了state属性
}