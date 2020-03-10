class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child, 
           meaning that if the `left` pointer is empty, 
           then we can just instantiate and insert the new node 
           as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
           then we recursively call the `insert` method 
           so the node is added further down the tree */
        this.left.insert(key, value);
      }
    } else {
      /* Similarly, if the new key is greater than the node's key 
       then you do the same thing, but on the right-hand side */
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error("Key Error");
    }
  }
  remove(key) {
    if (this.key === key) {
      /**if node has both left and right children,
       * find the min of the right side
       * replace current parent with successor
       * delete the duplicate
       */
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
           then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
           then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
           simply remove it and any references to it 
           by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      /**if key is not found keep searching */
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }
  _replaceWith(node) {
    /** */
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

//3
function main() {
  let tree1 = new BinarySearchTree();
  tree1.insert(3);
  tree1.insert(1);
  tree1.insert(4);
  tree1.insert(6);
  tree1.insert(9);
  tree1.insert(2);
  tree1.insert(5);
  tree1.insert(7);
  // console.log(tree1);
  //console.log(tree(tree1))
  //console.log(depth(tree1))
  let depthTree = new BinarySearchTree();
  depthTree.insert(7);
  depthTree.insert(4);
  depthTree.insert(5);
  depthTree.insert(9);
  //console.log(depth(depthTree))
  let pine = new BinarySearchTree();
  pine.insert(10);
  pine.left = new BinarySearchTree(5, null, 10);
  pine.right = new BinarySearchTree(15, null, 10);
  pine.right.left = new BinarySearchTree(20, null, 15);
  // console.log(checkBST(tree1));
  // console.log(checkBST(pine));
  let alphabet = new BinarySearchTree();
  alphabet.insert("E");
  alphabet.insert("A");
  alphabet.insert("S");
  alphabet.insert("Y");
  // alphabet.insert('Q')
  // alphabet.insert('U')
  alphabet.insert("E");
  alphabet.insert("S");
  alphabet.insert("T");
  alphabet.insert("I");
  alphabet.insert("O");
  alphabet.insert("N");
  //console.log(alphabet)
  // #7
  console.log(thirdLargest(tree1));
}
main();

//4
function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.key + tree(t.right);
}

//5
function depth(t) {
  if (!t) {
    return 0;
  }
  let right = depth(t.right) + 1;
  let left = depth(t.left) + 1;
  return Math.max(right, left);
}

//6
function checkBST(t) {
  if (!t) {
    return;
  }
  if (t.left) {
    if (t.left.key > t.key) {
      return false;
    }
    // If has kids
    if (t.left.left || t.left.right) {
      return checkBST(t.left);
    }
  }
  if (t.right) {
    if (t.right.key < t.key) {
      return false;
    }
    // If has kids
    if (t.right.left || t.right.right) {
      return checkBST(t.right);
    }
  }
  return true;
}

// checkBST(10)
//     checkBST(15) - false
//       checkBST(20) - return
//     5

// #7
function thirdLargest(t, array = [0, 0, 0]) {
  // array = storing 3 largest num
  if (!t) {
    return;
  }
  // evaluate t.key
  if (t.key > array[0]) {
    array[2] = array[1];
    array[1] = array[0];
    array[0] = t.key;
  } else if (t.key > array[1]) {
    array[2] = array[1];
    array[1] = t.key;
  } else if (t.key > array[2]) {
    array[2] = t.key;
  }

  // evaluate t.left and t.right
  thirdLargest(t.left, array);
  thirdLargest(t.right, array);
  // console.log(array);
  return array[2];
}
