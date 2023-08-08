import { Event } from "../types/Event";
import { Observer } from "../types/Observer";
import { Snake } from "./Snake";

export class Score implements Observer {
  public scoreSpan: HTMLSpanElement;
  public score: number = 0;

  onNotify(snake: Snake, event: Event): void {
    if (event === Event.AteApple) {
      this.score = snake.body.length - 1;
      this.scoreSpan.innerText = this.score.toString();
    }
  }

  constructor() {
    this.scoreSpan = document.querySelector("#score") as HTMLSpanElement;
    this.scoreSpan.innerText = "0";
  }
}
