class Heap<T> {
  private arr: T[];
  private compareFn: (a: T, b: T) => -1 | 1;

  constructor(arr: T[], compareFn: (a: T, b: T) => -1 | 1) {
    this.arr = arr;
    this.compareFn = compareFn;
    this.buildHeap();
  }

  public add(x: T) {
    this.arr.push(x);
    this.up(this.arr.length - 1);
  }

  private up(i: number) {
    if (i === 0) {
      return;
    }
    const parent = Math.floor((i - 1) / 2);
    if (this.compareFn(this.arr[i], this.arr[parent]) > 0) {
      return;
    }
    let tmp = this.arr[parent];
    this.arr[parent] = this.arr[i];
    this.arr[i] = tmp;
    this.up(parent);
  }

  public pop(): T {
    if (this.arr.length === 0) {
      throw new RangeError("Empty heap!");
    }
    if (this.arr.length === 1) {
      return this.arr.pop();
    }
    const first = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.down(0, this.arr.length);
    return first;
  }

  public toArray(): T[] {
    return this.arr;
  }

  public isEmpty(): boolean {
    return this.arr.length === 0;
  }

  private buildHeap() {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      this.down(i, this.arr.length);
    }
  }

  private down(i: number, length: number) {
    let first: number = 2 * i + 1;
    let second: number = 2 * i + 2;
    let k = i;

    if (first < length && this.compareFn(this.arr[first], this.arr[k]) < 0) {
      k = first;
    }

    if (second < length && this.compareFn(this.arr[second], this.arr[k]) < 0) {
      k = second;
    }

    if (k === i) {
      return;
    }

    let tmp = this.arr[i];
    this.arr[i] = this.arr[k];
    this.arr[k] = tmp;

    this.down(k, length);
  }
}

interface HeapItem {
  arr: number[];
  pointer: number;
}

function compareHeapItem(a: HeapItem, b: HeapItem) {
  return a.arr[a.pointer] < b.arr[b.pointer] ? -1 : 1;
}

function mergeArrays(...arr: number[][]): number[] {
  const items = arr.map((arr) => ({ arr, pointer: 0 }));
  const heap = new Heap(items, compareHeapItem);
  const result: number[] = [];
  while (!heap.isEmpty()) {
    const tmp = heap.pop();
    result.push(tmp.arr[tmp.pointer]);
    tmp.pointer++;
    if (tmp.pointer < tmp.arr.length) {
      heap.add(tmp);
    }
  }
  return result;
}

const x = mergeArrays(
  [2, 4, 6],
  [1, 2],
  [5, 8, 21],
  [9],
  [8, 73, 729],
  [7, 54, 200],
  [19],
  [8, 8, 8, 8]
);

console.log(x);
