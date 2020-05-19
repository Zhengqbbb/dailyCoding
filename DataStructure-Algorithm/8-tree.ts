/*
 * @Author: Qbenben
 * @Date: 2020-05-08 17:42:55
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-05-08 17:44:12
 * @Description: 实现一个二叉树，使插入、查询、删除的时间复杂度为O(logn)
 */

class TreeNode {
  data: number;
  leftChild: TreeNode | null;
  rightChild: TreeNode | null;
  constructor(data: number) {
    this.data = data;
    this.leftChild = this.rightChild = null;
  }
}

class Tree {
  root: null | TreeNode;
  list: number[] = [];
  constructor() {
    this.root = null;
  }

  add(data: number): boolean {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return true;
    } else {
      let current: null | TreeNode = this.root;
      let parentNode: TreeNode;
      while (current !== null) {
        parentNode = current;
        //如果两值相等，则直接退出
        if (current.data === data) {
          return false;
        }
        //当前值比插入值，搜索左子树
        else if (current.data > data) {
          current = current.leftChild;
          //左子树为空，直接赋值
          if (current === null) {
            parentNode.leftChild = newNode;
            return true;
          }
        } else {
          current = current.rightChild;
          if (current === null) {
            parentNode.rightChild = newNode;
            return true;
          }
        }
      }
    }
    return false;
  }

  hasValue(data: number): boolean {
    let current = this.root;
    while (current !== null) {
      if (current.data > data) {
        current = current.leftChild;
      } else if (current.data < data) {
        current = current.rightChild;
      } else {
        return true;
      }
    }
    return false;
  }
  private inOrder(current: TreeNode | null): number[] {
    if (current) {
      this.inOrder(current.leftChild);
      this.list.push(current.data);
      this.inOrder(current.rightChild);
    }
    return this.list;
  }

  print(): void {
    this.list.length > 0 && (this.list.length = 0);
    console.log(this.inOrder(this.root));
  }
  private getSmallest(node: TreeNode): TreeNode {
    if (node.leftChild == null) {
      return node;
    } else {
      return this.getSmallest(node.leftChild);
    }
  }

  private removeNode(current: TreeNode, data: number): null | TreeNode {
    if (current == null) {
      return null;
    }
    if (data == current.data) {
      //没有子树
      if (current.leftChild == null && current.rightChild == null) {
        return null;
      }
      //只有右子树
      else if (current.leftChild == null) {
        return current.rightChild;
      }
      //只有左子树
      else if (current.rightChild == null) {
        return current.leftChild;
      }
      //两个节点
      else {
        let temNode = this.getSmallest(current.rightChild);
        current.data = temNode.data;
        current.rightChild = this.removeNode(current.rightChild, temNode.data);
        return current;
      }
    } else if (data < current.data) {
      current.leftChild = this.removeNode(current.leftChild, data);
      return current;
    } else {
      current.rightChild = this.removeNode(current.rightChild, data);
      return current;
    }
  }

  remove(x: number): void {
    console.log(this.removeNode(this.root, x));
  }
}

let t = new Tree();
t.add(2);
t.add(2);
t.add(3);
t.add(1);
t.add(5);
t.add(6);
console.log(t.hasValue(8));
console.log(t.hasValue(2));
t.print();
t.remove(2);
t.print();
console.log(t);
