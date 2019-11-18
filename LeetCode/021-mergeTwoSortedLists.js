/*
 * @Author: QB
 * @Date: 2019-11-14 15:38:27
 * @LastEditTime: 2019-11-14 15:47:10
 * @LastEditors: QB
 * @Description: 021 - 合并两个有序链表（merge-two-sorted-lists）
 * 
 * 将两个有序链表合并为一个新的有序链表并返回。
 * 新链表是通过拼接给定的两个链表的所有节点组成的。 
 *  示例：
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */


/**
 * mergedHead表示最终结果
 * crt来追逐每次遍历的数据
 * @param  {} l1 链表1
 * @param  {} l2 链表2
 */
var mergeTwoLists = function(l1, l2) {
  var mergedHead = {
      val: -1,
      next: null
    },
    crt = mergedHead;
  while (l1 && l2) {
    if (l1.val > l2.val) {
      crt.next = l2;
      l2 = l2.next;
    } else {
      crt.next = l1;
      l1 = l1.next;
    }
    crt = crt.next;
  }
  crt.next = l1 || l2;

  return mergedHead.next;
};

var l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  }
};

var l2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 5,
      next: null
    }
  }
};

console.log(mergeTwoLists(l1, l2))