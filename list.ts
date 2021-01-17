class ListNode<T> {
    public data: T;
    public next: ListNode<T> | null;

    constructor(data: T, next: ListNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

class List<T> {
    private head: ListNode<T>;
    constructor() {
        this.head = null
    }

    [Symbol.iterator]() {
        let current = this.head;
        return {
            next() {
                if (current === null) {
                    return {
                        done: true,
                    };
                }

                const { data, next } = current;
                current = next;

                return {
                    done: false,
                    value: data,
                };
            }
        }
    }

    add(value: T) {
        this.head = new ListNode(value, this.head);
    }

    remove(value: T) {
        for (let node = this.head; node !== null; node = node.next) {
            if (node.data === value) {
                this.head = this.head.next
                break
            }

            if (node.next.data === value) {
                node.next = node.next.next;
                break
            }
        }
    }

    print() {
        for (let node = this.head; node !== null; node = node.next) {
            console.log(node.data)
        }
    }

    mutableReverse() {
        let prev = null
        let current = this.head
        let next = null

        while (current !== null) {
            next = current.next
            current.next = prev
            prev = current
            current = next
        }

        this.head = prev
    }

    reverse(): List<T> {
        return this.map(x => x).reverse();
    }

    mutableMap(cb: (n: T) => T) {
        for (let node = this.head; node !== null; node = node.next) {
            node.data = cb(node.data)
        }
        return this;
    }

    map<K>(cb: (n: T) => K): List<K> {
        const result = new List<K>();
        for (let node = this.head; node !== null; node = node.next) {
            result.add(cb(node.data));
        }
        return result;
    }

    filter(cb: (n: T) => boolean): List<T> {
        const result = new List<T>();
        for (let node = this.head; node !== null; node = node.next) {
            if (cb(node.data)) {
                result.add(node.data)
            }
        }
        return result
    }

    mutableFilter(cb: (n: T) => boolean): List<T> {
        this.head = List.filterHelper(this.head, cb);
        return this;
    }

    private static filterHelper<Y>(
        head: ListNode<Y>,
        cb: (n: Y) => boolean
    ): ListNode<Y> {
        let current = head
        while (current !== null && !cb(current.data)) {
            current = current.next
        }
        if (current !== null) {
            current.next = this.filterHelper(current.next, cb);
        }
        return current;
    }

    reduce<K>(fn: (acc: K, value: T, index: number) => K, initialValue: K): K {
        let result: K = initialValue
        let index = 0
        for(let node = this.head; node !== null; node = node.next) {
            result = fn(result, node.data, index)
            index++
        }
        return result
    }

    some(cb: (n: T) => boolean) {
        return this.reduce((a, b) => a || cb(b), false)
    }
    
    every(cb: (n: T) => boolean) {
        return this.reduce((a, b) => a && cb(b), true);
    }
}

const l = new List<number>();

l.add(1);
l.add(4);
l.add(2);

const obj = l.reduce((acc, value) => {
    acc[value] ??= 0;
    acc[value]++;
    return acc;
}, {});

console.log(obj);

const sum = l.reduce((acc, value, index) => acc + value ** index, 0);
// 2 ** 0 + 4 ** 1 + 1 ** 2 === 6

console.log(sum);

for (const x of l) {
    console.log(x);
}
