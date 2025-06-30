const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
    this.x = x;
    this.y =y
    }
}

// speed (difficulty) vars
let speed = 7;

// map vars
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

// snake head and body vars
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

// apple vars
let appleX = 5;
let appleY = 5

// movement vars
let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let highscore = 0;

// default to false before game begins
let gameOver = false;

// const gulpSound = new Audio('gulp');

function drawGame () {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    // increase speed the higher score you get
    if(score > 2) {
        speed = 11;
    } else if (score > 5) {
        speed = 15;
    } else if (score > 8) {
        speed = 19;
    } else if (score > 11) {
        speed = 23;
    } else if (score > 14) {
        speed = 27;
    } else if (score > 17) {
        speed = 31;
    } else if (score > 20) {
        speed = 35;
    } else if (score > 23) {
        speed = 39;
    }

    setTimeout(drawGame, 1000/speed);
};

function isGameOver() {
    // checks to see if the game has started yet
    if(yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // check wall collision
    if(headX < 0 || headX === tileCount) {
        gameOver = true;
    }else if(headY < 0 || headY === tileCount) {
        gameOver = true;
    }

    // check snakeParts collision
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    // set highscore
    if(score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
    } else {
        highscore = localStorage.getItem('highscore');
    };

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function clearScreen () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function changeSnakePosition () {
    headX =  headX + xVelocity;
    headY = headY + yVelocity;
}

function checkAppleCollision () {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        // gulpSound.play();
    }
}

function drawApple () {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY *tileCount, tileSize, tileSize)
}

function drawSnake () {
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)) // put an item at the end next to the head
    if(snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthest item from the snake parts if we have more than our tail size
    }

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// draws score on canvas
function drawScore () {
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText('Score: ' + score, canvas.width - 50, 10)

    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText('Highscore: ' + highscore, canvas.width - 71, 20)
}

// listens to key presses
document.body.addEventListener('keydown', keyDown);

function keyDown () {
    // up arrow key press
    if(event.keyCode == 38) {
        if(yVelocity == 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    // down arrow key press
    if(event.keyCode == 40) {
        if(yVelocity == -1) {
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }

    // left arrow key press
    if(event.keyCode == 37) {
        if(xVelocity == 1) {
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }

    // right arrow key press
    if(event.keyCode == 39) {
        if(xVelocity == -1) {
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

// master function
drawGame();

function resetGame() {
    gameOver = false;
    clearScreen()
    speed = 7;
    score = 0;
    headX = 10;
    headY = 10;
    // keep my thought process to see how I solved the problem:
    // I want to remove all the snake parts until we are back at the original two
    // I can loop shift the parts off the snake until I am back down to two parts
    // snakeParts.length = 5
    // i is greater than 2
    // i decrements by 1
    // i is now equal to 4
    // snakeparts.shift() to remove the furthest snakepart until we are back to 2
    for(let i = snakeParts.length; i > 2; i--) {
        snakeParts.shift();
    }
    tailLength = 2
    xVelocity = 0;
    yVelocity = 0;
    appleX = 5;
    appleY = 5
    drawGame()
}


