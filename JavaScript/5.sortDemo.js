/*
 * @Author: qbenben 
 * @Date: 2019-08-12 04:16:24 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-17 23:41:00
 * 排序算法练习
 */

var arrTest = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

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


//-----------------选择排序----------------
/**
 * <1>.初始状态：无序区为R[1..n]，有序区为空；
 * <2>.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * <3>.n-1趟结束，数组有序化了。
 * @param  {} arr
 */
var selectionSort = function(arr) {
  var len = arr.length;
  var minIndex;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) { //寻找最小的数
        minIndex = j; //将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

//-----------------插入排序----------------
/**
 * <1>.从第一个元素开始，该元素可以认为已经被排序；
 * <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * <5>.将新元素插入到该位置后；
 * <6>.重复步骤2~5。
 * 最佳情况：输入数组按升序排列。T(n) = O(n)
 * 最坏情况：输入数组按降序排列。T(n) = O(n2)
 * 平均情况：T(n) = O(n2)
 * @param  {} arr
 */
var insertionSort = function(arr) {
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    return 'arguments is not Array';
  }
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}


//-----------------二分插入排序----------------
/**
 * 改进插入排序： 查找插入位置时使用二分查找的方式
 * @param  {} arr
 */
function binaryInsertionSort(arr) {
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    return 'array is not an Array!';
  }
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i],
      left = 0,
      right = i - 1;
    while (left <= right) {
      var middle = parseInt((left + right) / 2);
      if (key < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
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