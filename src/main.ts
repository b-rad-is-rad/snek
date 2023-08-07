// Dependencies
import { Apple } from "./classes/Apple";
import { Snake } from "./classes/Snake";
import { Direction } from "./types/Direction";

// TODO currently move speed and FPS are tied together. Refactor to a constant FPS with adjustable move speed.
// TODO 

// Constants
const SNEK_SIZE = 20;
const CANVAS_WIDTH = 400 + SNEK_SIZE;
const CANVAS_HEIGHT = 500 + SNEK_SIZE;
const BACKGROUND_COLOR = "#FE00EA";
const FPS = 1000 / 10;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Functions
function randomX(): number {
  return Math.round((Math.random() * (CANVAS_WIDTH - SNEK_SIZE)) / SNEK_SIZE) * SNEK_SIZE;
}

function randomY(): number {
  return Math.round((Math.random() * (CANVAS_HEIGHT - SNEK_SIZE)) / SNEK_SIZE) * SNEK_SIZE;
}

function clearCanvas(): void {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function update(): void {
  snake.move();
  snake.checkEatApple(apple.x, apple.y);
}

function draw(): void {
  clearCanvas();
  snake.draw();
  apple.draw();
}

function gameLoop(): void {
  update();
  draw();
}
// *********
// Snek
// *********
// TODO implement scoreboard
// TODO implement console (shows snake position?)
// TODO restart button

const snake = new Snake(randomX(), randomY(), SNEK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, ctx);
const apple = new Apple(randomX(), randomY(), SNEK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, ctx);
snake.addObserver(apple);

document.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      snake.changeDirection(Direction.Up);
      break;
    case "KeyA":
      snake.changeDirection(Direction.Left);
      break;
    case "KeyS":
      snake.changeDirection(Direction.Down);
      break;
    case "KeyD":
      snake.changeDirection(Direction.Right);
      break;
    default:
      break;
  }
});

setInterval(gameLoop, FPS);
