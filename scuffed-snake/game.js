const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = spawnFood();
let score = 0;
let gameOver = false;

// input
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (velocity.y === 1) break;
      velocity = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (velocity.y === -1) break;
      velocity = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (velocity.x === 1) break;
      velocity = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (velocity.x === -1) break;
      velocity = { x: 1, y: 0 };
      break;
  }
});

function gameLoop() {
  if (gameOver) return drawGameOver();

  update();
  draw();

  setTimeout(gameLoop, 100); // slightly "scuffed" speed
}

function update() {
  const head = {
    x: snake[0].x + velocity.x,
    y: snake[0].y + velocity.y,
  };

  // wall collision (wrap = scuffed feature)
  if (head.x < 0) head.x = tileCount - 1;
  if (head.x >= tileCount) head.x = 0;
  if (head.y < 0) head.y = tileCount - 1;
  if (head.y >= tileCount) head.y = 0;

  // self collision
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      gameOver = true;
    }
  }

  snake.unshift(head);

  // food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.innerText = "score: " + score;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food (slightly cursed glow)
  ctx.fillStyle = "#ff4d6d";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // snake
  ctx.fillStyle = "#7aa2f7";
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  }
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.textAlign = "center";
  ctx.fillText("game over (skill issue)", canvas.width / 2, canvas.height / 2);
  ctx.fillText("refresh to suffer again", canvas.width / 2, canvas.height / 2 + 30);
}

gameLoop();
