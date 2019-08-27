/*
 * @Author: qbenben 
 * @Date: 2019-08-15 23:46:52 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-27 21:25:04
 * 全排列练习
 */

//----------------JS的全排列--------------------

var permutate = function(nums) {
  var len = nums.length;
  return perm(len - 1);

  function perm(i) {
    if (i == 0) {
      return [
        [nums[0]]
      ];
    } else if (i == 1) {
      return [
        [nums[0], nums[1]],
        [nums[1], nums[0]]
      ]; // 代码运行到此处跳出递归
    }
    var ans1 = perm(i - 1);
    var size = ans1.length;
    var ans2 = [];
    var fixNum = nums[i];
    for (var k = 0; k < size; k++) {
      for (var l = 0; l <= i; l++) {
        var arr = ans1[k].slice(); // 复制数组
        arr.splice(l, 0, fixNum); // 在这个数组每一个位置添加fixNum
        ans2.push(arr);
      }
    }
    return ans2;
  }
};
var arrTest = [1, 2, 3];
//console.log(permutate(arrTest));

// ES6
class Permutation {
  constructor(arr) {
    this.arr = Array.from(arr);
    this.result = [];
    this.len = 0;
    this.run(0);
  }

  run(index) {
    if (index == this.arr.length - 1) {
      this.result.push(Array.from(this.arr));
      this.len++;
      return;
    }
    for (let i = index; i < this.arr.length; i++) {
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]];
      this.run(index + 1);
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]];
    }
  }
}

//console.log(new Permutation(arrTest));