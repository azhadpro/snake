// snake.js

const gameBoard = document.getElementById('game-board');
const boardSize = 20;
const rows = gameBoard.clientHeight / boardSize;
const cols = gameBoard.clientWidth / boardSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 }; // Starting with initial movement to the right
let gameInterval;

// Simplified updateSnakePosition
function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop(); // Remove last part to maintain the snake length
    console.log("Snake Position:", snake); // Log updated position
}

// Optimized drawSnake
function drawSnake() {
    gameBoard.querySelectorAll('.snake').forEach(el => el.remove());
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

// Controls
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
    console.log('Direction:', direction);
});

// Simplified game loop
function gameLoop() {
    updateSnakePosition();
    drawSnake();
}

gameInterval = setInterval(gameLoop, 150); // Start game loop every 150ms
