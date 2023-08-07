import { Event } from "../types/Event";
import { Observer } from "../types/Observer";
import { Snake } from "./Snake";

export class Apple implements Observer {
  public x: number = 0;
  public y: number = 0;
  private size: number = 0;
  private color: string = "yellow";
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private ctx: CanvasRenderingContext2D;

  // TODO : Can't spawn in snake body
  // TODO BUG: apple can spawn 1 square outside canvas edge
  private move(): void {
    this.x = Math.round((Math.random() * (this.canvasWidth - this.size)) / this.size) * this.size;
    this.y = Math.round((Math.random() * (this.canvasHeight - this.size)) / this.size) * this.size;
    console.log(`{x: ${this.x}, y: ${this.y}}`);
  }

  public onNotify(snake: Snake, event: Event): void {
    this.move();
  }

  public draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  constructor(
    startX: number,
    startY: number,
    size: number,
    canvasWidth: number,
    canvasHeight: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = startX;
    this.y = startY;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
  }
}
