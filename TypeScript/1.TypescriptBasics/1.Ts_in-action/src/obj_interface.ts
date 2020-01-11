interface List {
  //只读属性
  readonly id: number;
  // id: number;
  name: string;
  //字符串索引签名
  //[x: string]: any;
  //可选属性
  age?: number
}

interface Result {
  data: List[];
}
//这个方法的参数约束条件一定要符合Result接口规范
function render(result: Result) {
  result.data.forEach(value => {
    console.log(value.id, value.name);
    if(value.age){
      console.log(value.age);
    }
  });
}
//假设从后端获取到的数据为下方
let result = {
  data: [
    { id: 1, name: "A ", sex: "male" },
    { id: 2, name: "B" }
  ]
};

render(result);
/* render({
  data: [
    { id: 1, name: "A ", sex: "male"},
    { id: 2, name: "B"},
  ]
}); */

//第一种类型断言：
/* render({
  data: [
    { id: 1, name: "A ", sex: "male" },
    { id: 2, name: "B" }
  ]
} as Result); */

//第二种类型断言：
/* render(<Result>{
  data: [
    { id: 1, name: "A ", sex: "male" },
    { id: 2, name: "B" }
  ]
}); */

//数字索引
interface StringArray {
  //用任意的去索引StringArrary
  //相当于声明了一个字符串数组
  [index: number]: string;
}
let chars: StringArray = ['A', 'B']

//字符串索引
interface Names {
  //用任意字符串去索引Names，得到的结果都string
  [x: string]: string;
  //可以混用
  [y: number]: string;
}