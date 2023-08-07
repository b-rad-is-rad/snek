import { Node } from '../types/Node'

export class SnakeBodyPositionNode implements Node {
    public pos: {x: number, y: number};
    public next: SnakeBodyPositionNode | null = null;

    constructor(x: number, y: number, next?: SnakeBodyPositionNode) {
        this.pos = {x,y};
        if (next) this.next = next;
    }
}