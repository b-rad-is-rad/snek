// Dependencies
import { Apple } from "./classes/Apple";
import { Snake } from "./classes/Snake";
import { Score } from "./classes/Score";
import { Direction } from "./types/Direction";
import { SnakeBodyPositionNode } from "./classes/SnakeBodyPositionNode";

// TODO currently move speed and FPS are tied together. Refactor to a constant FPS with adjustable move speed.
// TODO

// Constants
const SNEK_SIZE = 20;
const CANVAS_WIDTH = 400 + SNEK_SIZE;
const CANVAS_HEIGHT = 500 + SNEK_SIZE;
const BACKGROUND_COLOR = "#FE00EA";
const FPS = 1000 / 7;
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
  // TODO change move to move snake by a configurable velocity in pixels per sec.
  snake.move();
  snake.checkAppleEaten(apple.x, apple.y);
}

function drawSnek(): void {
  ctx.fillStyle = snake.snakeHeadColor;
  let currentNode: SnakeBodyPositionNode = snake.body.head!;

  for (let i = 0; i < snake.body.length; i++) {
    if (i === 1) {
      ctx.fillStyle = snake.snakeColor;
    }
    ctx.fillRect(currentNode.pos.x, currentNode.pos.y, SNEK_SIZE, SNEK_SIZE);
    currentNode = currentNode.next!;
  }
}

function drawApple(): void {
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x, apple.y, SNEK_SIZE, SNEK_SIZE);
}

function draw(): void {
  clearCanvas();
  drawSnek();
  drawApple();
}

function gameLoop(): void {
  // TODO update gameloop to perform X updates per frame.
  // TODO Then pause updates while frame renders. Then restart update after frame renders.
  // this will prevent race conditions and jittery movement since we wont update during a render and give
  // the draw function mutable data.

  // TODO draw happens at target FPS

  update();
  draw();
}
// *********
// Snek
// *********
// TODO implement scoreboard
// TODO implement console (shows snake position?)
// TODO restart button

const snake = new Snake(randomX(), randomY(), SNEK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT);
const apple = new Apple(randomX(), randomY(), SNEK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT);
const score = new Score();
snake.addObserver(apple);
snake.addObserver(score);

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
