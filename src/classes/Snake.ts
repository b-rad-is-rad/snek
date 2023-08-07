import { Direction } from "../types/Direction";
import { Event } from "../types/Event";
import { Observer } from "../types/Observer";
import { Subject } from "../types/Subject";
import { SnakeBody } from "./SnakeBody";
import { SnakeBodyPositionNode } from "./SnakeBodyPositionNode";

// TODO cut off body when collide with self

export class Snake implements Subject {
  private size: number = 0;
  private snakeHeadColor: string = "black";
  private snakeColor: string = "#53b3cb";
  private movementVector: { x: 0 | 1 | -1; y: 0 | 1 | -1 } = { x: 0, y: 0 };
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private appleEaten: boolean = false;
  private observers: Observer[] = [];
  public ctx: CanvasRenderingContext2D;
  public body: SnakeBody;

  private notifyObservers(event: Event): void {
    for (const obs of this.observers) {
      obs.onNotify(this, event);
    }
  }

  public addObserver(obs: Observer): number {
    this.observers.push(obs);
    return this.observers.length;
  }

  public removeObserver(obs: Observer): number {
    const index = this.observers.indexOf(obs);
    this.observers.splice(index, 1);
    return this.observers.length;
  }

  public changeDirection(dir: number): void {
    switch (dir) {
      case Direction.Up:
        if (!(this.movementVector.x === 0 && this.movementVector.y === 1) || this.body.length === 1) {
          this.movementVector = { x: 0, y: -1 };
        }
        break;
      case Direction.Down:
        if (!(this.movementVector.x === 0 && this.movementVector.y === -1) || this.body.length === 1) {
          this.movementVector = { x: 0, y: 1 };
        }
        break;
      case Direction.Right:
        if (!(this.movementVector.x === -1 && this.movementVector.y === 0) || this.body.length === 1) {
          this.movementVector = { x: 1, y: 0 };
        }
        break;
      case Direction.Left:
        if (!(this.movementVector.x === 1 && this.movementVector.y === 0) || this.body.length === 1) {
          this.movementVector = { x: -1, y: 0 };
        }
        break;
      default:
        break;
    }
  }

  public move(): void {
    const oldHead = this.body.head!;

    this.body.insert(
      0,
      oldHead.pos.x + this.size * this.movementVector.x,
      oldHead.pos.y + this.size * this.movementVector.y
    );

    this.wrapMoveAroundCanvas();

    if (!this.appleEaten) {
      this.body.pop();
    }
  }

  private wrapMoveAroundCanvas(): void {
    if (this.body.head!.pos.x < 0 || this.body.head!.pos.x > this.canvasWidth - this.size) {
      if (this.movementVector.x === 1) {
        this.body.head!.pos.x = 0;
      } else {
        this.body.head!.pos.x = this.canvasWidth - this.size;
      }
    }

    if (this.body.head!.pos.y < 0 || this.body.head!.pos.y > this.canvasHeight - this.size) {
      if (this.movementVector.y === 1) {
        this.body.head!.pos.y = 0;
      } else {
        this.body.head!.pos.y = this.canvasHeight - this.size;
      }
    }
  }

  public checkEatApple(appleX: number, appleY: number): void {
    if (this.body.head!.pos.x === appleX && this.body.head!.pos.y === appleY) {
      this.eatApple();
    } else {
      this.appleEaten = false;
    }
  }

  private eatApple(): void {
    this.appleEaten = true;
    this.notifyObservers(Event.AteApple);
  }

  public draw(): void {
    this.ctx.fillStyle = this.snakeHeadColor;

    let currentNode: SnakeBodyPositionNode = this.body.head!;

    for (let i = 0; i < this.body.length; i++) {
      if (i === 1) {
        this.ctx.fillStyle = this.snakeColor;
      }
      this.ctx.fillRect(currentNode.pos.x, currentNode.pos.y, this.size, this.size);
      currentNode = currentNode.next!;
    }
  }

  constructor(
    startX: number,
    startY: number,
    size: number,
    canvasWidth: number,
    canvasHeight: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.size = size;

    this.body = new SnakeBody(startX, startY);

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
  }
}
