const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data) {
    this.data=data;
    this.left=null;
    this.right=null;
    this.mainRoot=null;
  }

  root() {
    return this.mainRoot;
  }

  add(data) {
    this.mainRoot= addWithin(this.mainRoot,data);//положи в наш корень то что вернет функция

    function addWithin(node, data) {
      if(!node){
        return new BinarySearchTree (data);//добавляем новый узел если node=null
      }

      if (node.data === data) { // если узел уже есть, то ничего не делаем
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      }  else {
        node.right = addWithin(node.right,data);
      }
      return node;
    }
  }

  has(data) {
  return this.find(data) !== null;
  }

  find(data) {
    return searchWithin(this.mainRoot, data);
    function searchWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.data ===data) {
        return node;
      }
// если мы не нашли узел проходит либо влево либо вправо
      return data<node.data ? 
      searchWithin(node.left, data):
      searchWithin(node.right,data);
    }
  }

  remove(data) {
    this.mainRoot= removeNode(this.mainRoot,data); 
    function removeNode(node,data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left,data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        //если это лист, то просто удаляем
        if (!node.left&&!node.right) {
          return null;
        }
        if (!node.left) {
          node=node.right;
          return node;
        }
        if (!node.right) {
          node =node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right=removeNode(node.right, minFromRight.data);
        return node;
      }
    }

  }

  min() {
    if (!this.mainRoot) {
      return;
    }
    let node = this.mainRoot;
    while(node.left) {
      node=node.left;
    }
    return node.data;
  }

  max() {
    if (!this.mainRoot) {
      return;
    }
    let node = this.mainRoot;
    while(node.right) {
      node=node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};