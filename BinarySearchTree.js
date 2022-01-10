const Queue = require("./Queue");

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
  ​
    insert(key, value) {
      // if the tree is empty or missing root node
      // then the key is inserted as the root
      if (this.key == null) {
        this.key = key;
        this.value = value;
      } else if (key < this.key) {
        // if the tree exists then we want to compare the key
        // if it's smaller than the current key, insert to the left
        if (this.left == null) {
          // insert left tree if this node is empty to the left
          this.left = new BinarySearchTree(key, value, this);
        } else {
          // otherwise there is an existing left child
          // recursively call the insert() method so node is added further down
          this.left.insert(key, value);
        }
      } else {
        // do the same thing but for the right side
        if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
        } else {
          this.right.insert(key, value);
        }
      }
    }
  ​
    find(key) {
      // if the node is found, return the value
      if (this.key == key) {
        return this;
      } else if (key < this.key && this.left) {
        return this.left.find(key); // traverse to the left and recursively call find()
      } else if (key > this.key && this.right) {
        return this.right.find(key); // traverse to the right
      } else {
        // searched the entire tree and did not find the key
        throw new Error("Key Not Found");
      }
    }
  ​
    remove(key) {
      // removes nodes based on how many children nodes the parent has
      if (this.key == key) {
        // if the target node has a left AND a right child
        if (this.left && this.right) {
          // replace the key and value of the node to removed
          // search for the successor node
          // MAXIMUM on the left subtree or MINIMUM on the right subtree
          const successor = this.right._findMin(); // _findMin() is a function that finds the smallest node (farthest left)
          // const successor = this.left._findMax();
  ​
          // replace the key and value of the node to be removed
          // with the key and value of the successor
          this.key = successor.key;
          this.value = successor.value;
  ​
          // remove the duplicate node from the BST
          successor.remove(successor.key);
        } else if (this.left) {
          // if the node only has a left child
          this._replaceWith(this.left); // _replaceWith() helper function to replace the left
        } else if (this.right) {
          this._replaceWith(this.right);
        } else {
          // if the node has no children (it is a leaf)
          this._replaceWith(null);
        }
  ​
        // if the current key does not match the key of the current node (not found yet)
      } else if (key < this.key && this.left) {
        this.left.remove(key); // recursively call the remove method
      } else if (key > this.key && this.right) {
        this.right.remove(key);
      } else {
        // the key does not exist in our tree
        throw new Error("Key Not Found");
      }
    }
  ​
    // replace the node we with with the node passed in
    _replaceWith(node) {
      // check if node we are replacing has a parent
      // connect the references from the parent to the replaced node
      if (this.parent) {
        // current node to-be-replaced is on the left
        if (this.parent.left == this) {
          this.parent.left = node;
        } else if (this.parent.right == this) {
          this.parent.right = node;
        }
  ​
        // replace the node's parent reference
        if (node) {
          node.parent = this.parent;
        }
  ​
        // if the node is a root node, we copy over the properties of the replacement node
      } else {
        if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        } else {
          // if "null" was passed in
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }
  ​
    _findMin() {
      // if the current node has no LEFT child, it is the absolute MINIMUM
      if (!this.left) {
        return this;
      }
  ​
      // keep traversing recursively to the left
      return this.left._findMin();
    }
  ​
    // _findMax() {
    //   // if the current node has no RIGHT child, it is the absolute MAXIMUM
    //   if (!this.right) {
    //     return this;
    //   }
  ​
    //   // keep traversing recursively to the right
    //   return this.right._findMax();
    // }
    dfsPreOrder(values = []) {
      // process node
      values.push(this.value);
  ​
      // process left recursively - step left
      if (this.left) {
        this.left.dfsPreOrder(values);
      }
  ​
      // process right recursively - step right
      if (this.right) {
        this.right.dfsPreOrder(values);
      }
  ​
      return values;
    }
  ​
    dfsInOrder(values = []) {
      // left
      if (this.left) {
        this.left.dfsInOrder(values);
      }
  ​
      // process node
      values.push(this.value);
  ​
      // right
      if (this.right) {
        this.right.dfsInOrder(values);
      }
  ​
      return values;
    }
  ​
    dfsPostOrder(values = []) {
      // left
      if (this.left) {
        this.left.dfsPostOrder(values);
      }
  ​
      // right
      if (this.right) {
        this.right.dfsPostOrder(values);
      }
  ​
      // process node
      values.push(this.value);
  ​
      return values;
    }
  ​
    bfs(values = []) {
      const queue = new Queue();
      queue.enqueue(this); // start the traversal at the root node
      let node = queue.dequeue(); // remove the node from the queue for processing
  ​
      while (node) {
        // process node
        values.push(node.value);
  ​
        // step left
        if (node.left) {
          queue.enqueue(node.left); // add left child to the queue
        }
  ​
        // step right
        if (node.right) {
          queue.enqueue(node.right); // add right child to the queue
        }
  ​
        node = queue.dequeue(); // we are done processing prev node so move onto the next node in queue
      }
  ​
      return values;
    }
  }
  ​
  module.exports = BinarySearchTree