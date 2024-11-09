// declare

const gameBoard = document.getElementByid('game-board');
const boardSize = 20;
const rows = gameBoard.clientHeight * boardSize;
const cols = gameBoard.clientWidth * boardSize;

//position awal

let snake = [{x: 10,y: 10}];
let food = {x:Math.floor(Math.random() * cols), y:Math.floor(Math.random() * rows)};
let direction = {x: 0, y: 0};
let gameInterval;

// draw snake and food

function drawSnake() {
    gameBoard.innerHTML = ''; // Clear previous render
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * boardSize}px`;
    foodElement.style.top = `${food.y * boardSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// snakes position and collision

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

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop(); // Remove tail if no food is eaten
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
}

//keys

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
});

// loop

function gameLoop() {
    updateSnakePosition();
    drawSnake();
    drawFood();
}

gameInterval = setInterval(gameLoop, 100); // Adjust interval for game speed
