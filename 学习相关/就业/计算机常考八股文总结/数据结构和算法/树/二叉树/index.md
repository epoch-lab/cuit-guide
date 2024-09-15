**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 什么是二叉树？二叉树有哪些常见遍历方法？

二叉树是一种树形结构，每个节点最多有两个子节点，分别是左子节点和右子节点。

二叉树有如下几个特点：

1. 第 i 层最多有 2^(i-1) 个节点。
2. 深度为 k 的二叉树最多有 2^k-1 个节点。
3. 叶子节点数等于度为 2 的节点数加 1。（度的定义：一个节点的子节点个数称为度）

上面的定义 3 还可以推导出，在完全二叉树中，最大非叶子节点索引为 n/2 - 1，其中 n 为节点总数。

二叉树的常见遍历方法主要有以下几种：

1. 前序遍历（Preorder Traversal）：根节点 -> 左子树 -> 右子树。

```java
// 递归实现
public void preorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    System.out.println(root.val);
    preorderTraversal(root.left);
    preorderTraversal(root.right);
}

// 迭代实现
public void preorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        System.out.println(node.val);
        if (node.right != null) {
            stack.push(node.right);
        }
        if (node.left != null) {
            stack.push(node.left);
        }
    }
}
```

2. 中序遍历（Inorder Traversal）：左子树 -> 根节点 -> 右子树。

```java
// 递归实现
public void inorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    inorderTraversal(root.left);
    System.out.println(root.val);
    inorderTraversal(root.right);
}

// 迭代实现
public void inorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    Stack<TreeNode> stack = new Stack<>();
    TreeNode node = root;
    while (node != null || !stack.isEmpty()) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        System.out.println(node.val);
        node = node.right;
    }
}
```

3. 后序遍历（Postorder Traversal）：左子树 -> 右子树 -> 根节点。
 
```java
// 递归实现
public void postorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    postorderTraversal(root.left);
    postorderTraversal(root.right);
    System.out.println(root.val);
}

// 迭代实现
public void postorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    Stack<Integer> output = new Stack<>();
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        output.push(node.val);
        if (node.left != null) {
            stack.push(node.left);
        }
        if (node.right != null) {
            stack.push(node.right);
        }
    }
    while (!output.isEmpty()) {
        System.out.println(output.pop());
    }
}
```

4. 层序遍历（Levelorder Traversal）：逐层遍历，从上到下，从左到右。

```java
public void levelorderTraversal(TreeNode root) {
    if (root == null) {
        return;
    }
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        System.out.println(node.val);
        if (node.left != null) {
            queue.offer(node.left);
        }
        if (node.right != null) {
            queue.offer(node.right);
        }
    }
}
```

其中，前序遍历、中序遍历、后序遍历是深度优先遍历 DFS，层序遍历是广度优先遍历 BFS。

## 有哪些常见的特殊二叉树？

常见的特殊二叉树主要有以下几种：

1. 满二叉树：每个节点都有两个子节点，除了叶子节点，其他节点都有两个子节点。
2. 完全二叉树：除了最后一层，其他层都是满的，最后一层的节点都靠左排列。
3. 平衡二叉树：左子树和右子树的高度差不超过 1，可以保持树的平衡，提高检索效率。
4. 二叉搜索树：左子树的所有节点都小于根节点，右子树的所有节点都大于根节点，可以提高检索效率。
5. 红黑树：一种近似平衡的二叉搜索树，每个节点是红色或黑色，可以提高检索效率。