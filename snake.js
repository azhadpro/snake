// snake.js

// Set up the game board and define cell size
const gameBoard = document.getElementById('game-board');
const boardSize = 20; // Size of each cell in pixels
const rows = gameBoard.clientHeight / boardSize;
const cols = gameBoard.clientWidth / boardSize;

// Initial positions for snake and food
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let direction = { x: 0, y: 0 }; // Initial direction is stationary
let gameInterval;

// Function to draw the snake
function drawSnake() {
    gameBoard.innerHTML = ''; // Clear previous render of the snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

// Function to draw the food
function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * boardSize}px`;
    foodElement.style.top = `${food.y * boardSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// Function to update the snake's position
function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for wall collision or self-collision
    if (
        head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert('Game Over!');
        return;
    }

    snake.unshift(head); // Add new head
    console.log(snake); // Check if snake array is updating

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop(); // Remove tail
    }
}


// Function to randomly place food on the board
function placeFood() {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
}

// Handle keyboard controls
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
    console.log(direction); // Check if direction is updating
});


// Game loop to continuously update and draw the game
function gameLoop() {
    updateSnakePosition();
    drawSnake();
    drawFood();
}

// Start the game loop
gameInterval = setInterval(gameLoop, 1000); // Game speed is set to 100ms per update
