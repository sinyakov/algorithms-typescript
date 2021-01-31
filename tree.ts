interface KeyStorage<T> {
    add(value: T): this;
    has(value: T): boolean;
    delete(value: T): boolean;
}

class BinaryTreeNode<T> {
    data: T;
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;

    constructor(
        data: T,
        left: BinaryTreeNode<T> = null,
        right: BinaryTreeNode<T> = null,
    ) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}


class BinaryTree<T> implements KeyStorage<T> {
    private root: BinaryTreeNode<T>;
    constructor() {
        this.root = null;
    }

    // https://en.wikipedia.org/wiki/Binary_search_tree#/media/File:Binary_search_tree.svg
    add(value: T): this {
        if (this.root === null) {
            this.root = new BinaryTreeNode(value)
            return this
        }

        //          6
        //        /   \
        //       5     8
        //      /     / \
        //     3     7   12
        //    / \       
        //   1   4     

        let node = this.root

        while (true) {
            if (value === node.data) {
                break
            } else if (value > node.data) {
                if (node.right === null) {
                    node.right = new BinaryTreeNode(value)
                    break
                }
                node = node.right
            } else {
                if (node.left === null) {
                    node.left = new BinaryTreeNode(value)
                    break
                }
                node = node.left
            }
        }
        return this
    }

    getHeight() {
        function helper<K>(node: BinaryTreeNode<K>): number {
            if (node === null) {
                return 0;
            }
            let leftCount = helper(node.left);
            let rightCount = helper(node.right)

            if (leftCount > rightCount) {
                return leftCount + 1
            } else {
                return rightCount + 1
            }
        }
        return helper(this.root);
    }


    has(value: T): boolean {
        let node = this.root
        while (node !== null) {
            if (value === node.data) {
                return true
            } else if (value > node.data) {
                node = node.right
            } else {
                node = node.left
            }
        }
        return false
    }

    // https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/AVL-tree-delete.svg/2560px-AVL-tree-delete.svg.png

    delete(value: T) {
        // самый большой элемент слева / самый маленький элемент справа
        let parent = null
        let current = this.root
    }

    getRoot() {
        return this.root;
    }

    print() {
        BinaryTree.print(this.root);
    }

    dfs<K>(cb: (value: T) => K) {

    }

    bfs<K>(cb: (value: T) => K) {

    }

    reduce<K>(cb: (acc: K, value: T) => K, initialValue: K) {

    }

    toArray() {
        // отсортированный массив
    }

    private static print<K>(root: BinaryTreeNode<K>, depth = 0) {
        if (root === null) {
            return;
        }

        const { data, left, right } = root;

        BinaryTree.print(left, depth + 1);
        console.log('  '.repeat(depth), data)
        BinaryTree.print(right, depth + 1);
    }
}

const s: KeyStorage<number> = new BinaryTree();

s.add(6).add(5).add(8).add(3).add(1).add(4).add(7).add(12).add(9);

console.log(s.has(1))
console.log(s.has(10))
console.log(s.delete(1))
console.log(s.delete(1))
