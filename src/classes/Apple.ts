import { Event } from "../types/Event";
import { Observer } from "../types/Observer";
import { Snake } from "./Snake";

export class Apple implements Observer {
  public x: number = 0;
  public y: number = 0;
  public size: number = 0;
  public color: string = "yellow";
  public canvasWidth: number = 0;
  public canvasHeight: number = 0;

  // TODO : Can't spawn in snake body
  public move(): void {
    this.x = Math.round((Math.random() * (this.canvasWidth - this.size)) / this.size) * this.size;
    this.y = Math.round((Math.random() * (this.canvasHeight - this.size)) / this.size) * this.size;
  }

  public onNotify(snake: Snake, event: Event): void {
    this.move();
  }

  constructor(startX: number, startY: number, size: number, canvasWidth: number, canvasHeight: number) {
    this.x = startX;
    this.y = startY;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
}
