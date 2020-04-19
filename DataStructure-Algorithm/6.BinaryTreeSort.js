/*
 * @Author: Qbenben
 * @Date: 2020-04-17 23:44:15
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-04-19 21:40:33
 * @Description: 二叉树的遍历
 */

//--------------------二叉树是什么------------------------
/**
 * 二叉树是一种特殊的树，有以下两个特征：
 * 二叉树的每个结点的度都不大于2；
 * 二叉树每个结点的孩子结点次序不能任意颠倒。
 */

//--------------------为什么使用二叉树------------------------
/**
 * 二叉树的前序遍历可以用来显示目录结构等；
 * 中序遍历可以实现表达式树，在编译器底层很有用；
 * 后序遍历可以用来实现计算目录内的文件及其信息等。
 * 二叉树是非常重要的数据结构， 其中二叉树的遍历要使用到栈和队列还有递归等，很多其它数据结构也都是基于二叉树的基础演变而来的。
 * 熟练使用二叉树在很多时候可以提升程序的运行效率，减少代码量，使程序更易读。
 */

//--------------------二叉树的遍历------------------------
/**
 * 二叉树有深度遍历和广度遍历， 深度遍历有前序、 中序和后序三种遍历方法。 
 * 广度遍历就是层次遍历。 因为树的定义本身就是递归定义， 因此采用递归的方法实现树的三种遍历容易理解而且代码比较简洁。
 * 
 * 四种遍历的主要思想：
 * 前序遍历：访问根–>遍历左子树–>遍历右子树;
 * 中序遍历：遍历左子树–>访问根–>遍历右子树;
 * 后序遍历：遍历左子树–>遍历右子树–>访问根;
 * 广度遍历：按照层次一层层遍历;
 */

var tree = {
  value: "-",
  left: {
    value: '+',
    left: {
      value: 'a',
    },
    right: {
      value: '*',
      left: {
        value: 'b',
      },
      right: {
        value: 'c',
      }
    }
  },
  right: {
    value: '/',
    left: {
      value: 'd',
    },
    right: {
      value: 'e',
    }
  }
}

/* ---------------------递归-------------------- */
//先序
var preListRec = []; //定义保存先序遍历结果的数组
/**
 * 先序递归遍历的思路是先遍历根结点，将值存入数组，
 * 然后递归遍历：先左结点，将值存入数组，
 * 继续向下遍历，然后再回溯遍历右结点，将值存入数组，这样递归循环。
 */
var preOrderRec = function(node) {
  if (node) { //判断二叉树是否为空
    preListRec.push(node.value); //将结点的值存入数组中
    preOrderRec(node.left); //递归遍历左子树
    preOrderRec(node.right); //递归遍历右子树
  }
}
preOrderRec(tree);
console.log(preListRec);
//[ '-', '+', 'a', '*', 'b', 'c', '/', 'd', 'e' ]

//中序
var inListRec = []; //定义保存中序遍历结果的数组
/**
 * 中序递归遍历的思路是先递归遍历左子树，从最后一个左子树开始存入数组，
 * 然后回溯遍历双亲结点，再是右子树，
 * 这样递归循环。
 */
var inOrderRec = function(node) {
  if (node) { //判断二叉树是否为空
    inOrderRec(node.left); //递归遍历左子树
    inListRec.push(node.value); //将结点的值存入数组中
    inOrderRec(node.right); //递归遍历右子树
  }
}
inOrderRec(tree);
console.log(inListRec);
//[ 'a', '+', 'b', '*', 'c', '-', 'd', '/', 'e' ]


//后序
var postListRec = []; //定义保存后序遍历结果的数组
/**
 * 递归遍历也是和上面的差不多，
 * 先走左子树，当左子树没有孩子结点时，
 * 将此结点的值放入数组中，然后回溯遍历双亲结点的右结点，递归遍历。
 */
var postOrderRec = function(node) {
  if (node) { //判断二叉树是否为空
    postOrderRec(node.left); //递归遍历左子树
    postOrderRec(node.right); //递归遍历右子树
    postListRec.push(node.value); //将结点的值存入数组中
  }
}
postOrderRec(tree);
console.log(postListRec);
//[ 'a', 'b', 'c', '*', '+', 'd', 'e', '/', '-' ]