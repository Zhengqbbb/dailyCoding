//基本实现
class Dog {
  constructor(name: string) {
    this.name = name;
  }
  //对构造函数进行私有成员属性改造：证明该类既无法创造实例也无法被继承
  /*  private constructor(name: string) {
    this.name = name;
  } */
  name: string = "ben";
  run() {
    return "running Dog";
  }
  //私有成员：只能在类的本身被调用
  private pri() {}
  //受保护成员：只能在类和子类中被访问，而不能再类的实例中被访问
  protected pro() {}
  //只读属性：该属性不能被更改
  readonly legs: number = 4;
  //类的静态成员
  static food: string = "bones";
}

//类的继承
class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }
  color: string;
}

//抽象类：只能被继承，可以定义方法里面有具体实现，这样子类就不用实现了。
//也可以在抽象类中定义方法但是不实现，构成一个抽象方法
abstract class Animal {
  eat() {
    console.log("eat");
  }
  abstract sleep(): void;
}
class Dog_1 extends Animal {
  constructor(public name: string) {
    super();
    this.name = name;
  }

  run() {}
  // 实现
  sleep() {
    console.log("Dog sleep");
  }
}

let dog_1 = new Dog_1("wangcai");
dog_1.eat();
//多态的实现
class Cat extends Animal {
  sleep() {
    console.log("Cat sleep");
  }
}

let cat = new Cat();

let animals: Animal[] = [dog_1, cat];
animals.forEach(i=>{
  i.sleep()
})//("Dog sleep")("Cat sleep")
