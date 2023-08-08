import { Direction } from "../types/Direction";
import { Event } from "../types/Event";
import { Observer } from "../types/Observer";
import { Subject } from "../types/Subject";
import { SnakeBody } from "./SnakeBody";

// TODO cut off body when collide with self

export class Snake implements Subject {
  public size: number = 0;
  public snakeHeadColor: string = "black";
  public snakeColor: string = "#53b3cb";
  public movementVector: { x: 0 | 1 | -1; y: 0 | 1 | -1 } = { x: 0, y: 0 };
  public canvasWidth: number = 0;
  public canvasHeight: number = 0;
  public appleEaten: boolean = false;
  public observers: Observer[] = [];
  public body: SnakeBody;

  public async notifyObservers(event: Event): Promise<void> {
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

    if (this.appleEaten) {
      this.notifyObservers(Event.AteApple);
    } else {
      this.body.pop();
    }
  }

  public wrapMoveAroundCanvas(): void {
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

  public checkAppleEaten(appleX: number, appleY: number): void {
    if (this.body.head!.pos.x === appleX && this.body.head!.pos.y === appleY) {
      this.appleEaten = true;
    } else {
      this.appleEaten = false;
    }
  }

  constructor(startX: number, startY: number, size: number, canvasWidth: number, canvasHeight: number) {
    this.size = size;
    this.body = new SnakeBody(startX, startY);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
}
