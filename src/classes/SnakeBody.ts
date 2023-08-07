import { SnakeBodyPositionNode } from "./SnakeBodyPositionNode";

export class SnakeBody {
  public head: SnakeBodyPositionNode | null = null;
  public tail: SnakeBodyPositionNode | null = null;
  public length: number = 0;

  public push(posX: number, posY: number): number {
    const newTail = new SnakeBodyPositionNode(posX, posY);

    if (this.length === 0) {
      this.head = newTail;
    } else {
      this.tail!.next = newTail;
    }

    this.tail = newTail;
    this.length++;

    return this.length;
  }

  public pop(): SnakeBodyPositionNode | null {
    if (!this.head) return null;

    const oldTail = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let newTail: SnakeBodyPositionNode | null = this.head;

      while (newTail!.next !== this.tail) {
        newTail = newTail!.next;
      }

      this.tail = newTail;
      this.tail!.next = null;
    }

    this.length--;

    return oldTail;
  }

  public insert(indexToInsertAt: number, posX: number, posY: number): boolean {
    const node = new SnakeBodyPositionNode(posX, posY);
    let currentNode: SnakeBodyPositionNode | null = this.head;

    if (indexToInsertAt < 0) {
      return false;
    } else if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else if (indexToInsertAt === 0) {
      node.next = this.head;
      this.head = node;
    } else if (indexToInsertAt === this.length - 1) {
      this.tail!.next = node;
      this.tail = node;
    } else if (indexToInsertAt > this.length - 1) {
      return false;
    } else {
      for (let i = 0; i < indexToInsertAt; i++) {
        currentNode = currentNode!.next;
      }

      node.next = currentNode!.next;
      currentNode!.next = node;
    }

    this.length++;

    return true;
  }
  // public delete(indexToDelete: number): boolean {
    // if (this.length <= 0 || indexToDelete > this.length - 1) return false;

    // let currentNode: SnakeBodyPositionNode = this.head!;

    // for (let i = 0; i < indexToDelete; i++) {
        // currentNode = currentNode.next!;
    // }



  // }

  // public reverse() {}

  constructor(headX: number, headY: number) {
    this.push(headX,headY);
  }
}
