/*
 * @Author: qbenben 
 * @Date: 2019-08-12 04:16:24 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-11-21 11:19:24
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
 * <2>.第i趟排序(i=1,2,3...n-1)开始时，
 * 当前有序区和无序区分别为R[1..i-1]和R(i..n）。
 * 该趟排序从当前无序区中-选出关键字最小的记录 R[k]，
 * 将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * <3>.n-1趟结束，数组有序化了。
 * 最佳情况：T(n) = O(n2)
 * 最差情况：T(n) = O(n2)
 * 平均情况：T(n) = O(n2)
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


//--------------------希尔排序---------------------
/**
 * <1>. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
 * <2>.按增量序列个数k，对序列进行k 趟排序；
 * <3>.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 * 最佳情况：T(n) = O(nlog2 n)
 * 最坏情况：T(n) = O(nlog2 n)
 * 平均情况：T(n) =O(nlog n)
 * @param  {} arr
 */
var shellSort = function(arr) {
  var len = arr.length,
    temp,
    gap = 1;
  console.time('希尔排序耗时:');
  while (gap < len / 5) { //动态定义间隔序列
    gap = gap * 5 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  console.timeEnd('希尔排序耗时:');
  return arr;
}

//--------------归并排序-------------------
/**
 * 和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，
 * 因为始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间。
 * 
 * <1>.把长度为n的输入序列分成两个长度为n/2的子序列
 * <2>.对这两个子序列分别采用归并排序；
 * <3>.将两个排序好的子序列合并成一个最终的排序序列。
 * 最佳情况：T(n) = O(nlogn)
 * 最差情况：T(n) = O(nlogn)
 * 平均情况：T(n) = O(nlogn)
 * 
 * 使用递归的归并排序
 * @param  {} arr 
 */
var mergeSort = function(arr) {
  var len = arr.length;
  //递归出口
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
/**
 * @param  {} left  左数组
 * @param  {} right 右数组
 */
var merge = function(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length)
    result.push(left.shift());
  while (right.length)
    result.push(right.shift());

  return result;
}

console.log(mergeSort(arrTest));




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

//--------------三路快排-------------------
/**
 * 三路快速排序是快速排序的的一个优化版本， 将数组分成三段， 即小于基准元素、 等于 基准元素和大于基准元素， 这样可以比较高效的处理数组中存在相同元素的情况,其它特征与快速排序基本相同。
 * 随机选取基准值base(支点随机选取),参考快速排序算法的优化思路总结
 * 配合着使用插入排序(当问题规模较小时，近乎有序时，插入排序表现的很好)
 * 当大量数据，且重复数多时，用三路快排
 * @param  {} arr
 */
var quickSortThreeWay = function(arr) {
  if (arr.length === 0) {
    return [];
  }
  var left = [];
  var center = [];
  var right = [];
  var pivot = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] === pivot) {
      center.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSortThreeWay(left), ...center, ...quickSortThreeWay(right)];
}


/* --------------堆排序--------------- */

var _isArray = function(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
}
/**
 * 维护堆的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
 * @param  {number []} arr  数组 
 * @param  {number} x       数组下标
 * @param  {number} len     堆的大小
 */
var heapify = function(arr, x, len) {
  if (!_isArray || typeof x !== 'number') {
    return 'arr is not an Array or x is not a number!';
  }
  var l = 2 * x + 1,
    r = 2 * x + 2,
    largest = x;
  if (l < len && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < len && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest != x) {
    arr[x] ^= arr[largest];
    arr[largest] ^= arr[x];
    arr[x] ^= arr[largest];
    heapify(arr, largest, len);
  }
}
/**
 * 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。
 * 最佳情况：T(n) = O(n2)
 * 最差情况：T(n) = O(n2)
 * 平均情况：T(n) = O(n2)
 * 堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
 * @param  {number []} arr
 */
var HeapSort = function(arr) {
  if (!_isArray(arr)) return 'arr is not a Array';
  //建堆
  var heapSize = arr.length;
  for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(arr, i, heapSize);
  }
  //堆排序
  for (var j = heapSize - 1; j >= 1; j--) {
    arr[0] ^= arr[j];
    arr[j] ^= arr[0];
    arr[0] ^= arr[j];
    heapify(arr, 0, --heapSize);
  }
  return arr;

}
console.log(HeapSort(arrTest));