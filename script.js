const board = document.querySelector('.board');
const scoreElement = document.querySelector('.score');
let foodX, foodY;
let gameOver = false;
const playerNameInput = document.querySelector('#player-name');
let snakeX = 1, snakeY = 1;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

const changePosition = () => {
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
}

const startTimer = () => {
    let startTime = new Date(); 
    setInterval = () => {
        let currentTime = new Date();
        let diff  = currentTime - startTime;
        let hours = Math.floor(diff / 3600000);
        let minutes = Math.floor((diff / 60000) % 60);
        let seconds = Math.floor((diff / 1000) % 60);
        document.querySelector('.timer').innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown"  && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft"  && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight"  && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changePosition();
        snakeBody.push([foodX, foodY]);
        score++;
        // console.log(score);
        scoreElement.innerText = `Score \n${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    board.innerHTML = htmlMarkup;
}

changePosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);