/*
 * @Author: qbenben 
 * @Date: 2019-08-12 04:16:24 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-16 23:53:43
 * 排序算法练习
 */

//-----------------冒泡排序----------------
/**
 * <1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * <2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数
 * <3>.针对所有的元素重复以上的步骤，除了最后一个；
 * <4>.重复步骤1~3，直到排序完成。
 * 最佳情况：T(n) = O(n)当输入的数据已经是正序时
 * 最差情况：T(n) = O(n2)当输入的数据是反序时
 * 平均情况：T(n) = O(n2)
 * @param  {} arr
 */
var bubbleSort = function(arr) {
  //控制比较的次数
  for (var i = 0; i < arr.length - 1; i++) {
    //控制每一轮比较的次数
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp
      }
    }
  }
  return arr;
}


//--------------快速排序-------------------
/**
 * <1>.从数列中挑出一个元素，称为 "基准"（pivot）；
 * <2>.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 * <3>.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 * 最佳情况：T(n) = O(nlogn)
 * 最差情况：T(n) = O(n2)
 * 平均情况：T(n) = O(nlogn)
 * @param  {} arr
 */
var quickSort = function(arr) {
  //长度小于1无法不用比较，同时也是后面递归的终止条件
  if (arr.length <= 1) {
    return arr;
  }
  //基准数索引
  var midIndex = Math.floor(arr.length / 2);
  //splice方法删除索引位置上的值，返回基准数值
  var midIndexVal = arr.splice(midIndex, 1);
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < midIndexVal) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  //递归分治
  return quickSort(left).concat(midIndexVal, quickSort(right));
}