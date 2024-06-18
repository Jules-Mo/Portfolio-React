const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const startBtn = document.getElementById("startBtn");
const playerWins = {}; // Stocke le nombre de victoires des joueurs

let player1Name = 'J1';
let player2Name = 'J2';
let currentPlayer1Score = 0;
let currentPlayer2Score = 0;

startBtn.addEventListener("click", () => {
    player1Name = document.getElementById("player1Name").value || 'J1';
    player2Name = document.getElementById("player2Name").value || 'J2';
    menu.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
});

document.getElementById('menu-button').addEventListener('click', () => {
    clearInterval(intervalID);
    modal.style.display = "none";
    menu.style.display = "block";
    gameContainer.style.display = "none";
    updatePlayerScores();
});

const gameBoard = document.querySelector(".gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector(".scoreText");
const resetBtn = document.querySelector(".resetBtn");
const modal = document.querySelector(".modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close");

const { width: gameWidth, height: gameHeight } = gameBoard;

const colors = {
    board: 'grey',
    paddle1: "white",
    paddle2: "black",
    paddleBorder: "black",
    ballWhite: "white",
    ballBlack: "black",
    ballBorder: "black"
};

const ballRadius = 12.5;
const paddleSpeed = 7;

let intervalID, ballSpeed, ballX, ballY, ballXDirection, ballYDirection;
let gamePaused = false; // Check si jeu en pause ou pas
let ballColor = colors.ballWhite; // Couleur de base de la balle = blanche
let lastPlayerHit = null; // Suit le dernier joueur avec lequel la balle a interagi

const paddle1 = { width: 25, height: 100, x: 0, y: 0 };
const paddle2 = { width: 25, height: 100, x: gameWidth - 25, y: gameHeight - 100 };

const keysPressed = {};
window.addEventListener("keydown", event => keysPressed[event.keyCode] = true);
window.addEventListener("keyup", event => keysPressed[event.keyCode] = false);
resetBtn.addEventListener("click", resetGame);
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    gamePaused = false;
    resetGame();
});

document.getElementById('replay-button').addEventListener('click', () => {
    resetGame();
    modal.style.display = "none";
    gamePaused = false;
});

function startGame() {
    if (!(player1Name in playerWins)) {
        playerWins[player1Name] = 0; // Initialise le nombre de victoires du joueur 1 à 0
    }
    if (!(player2Name in playerWins)) {
        playerWins[player2Name] = 0; // Initialise le nombre de victoires du joueur 2 à 0
    }
    currentPlayer1Score = 0;
    currentPlayer2Score = 0;
    scoreText.textContent = `${player1Name}: ${currentPlayer1Score} - ${currentPlayer2Score} :${player2Name}`; // Affiche les scores initiaux
    if (!gamePaused) {
        createBall();
    }
    gamePaused = false;
    gameLoop();
    updatePlayerScores();
}

function gameLoop() {
    if (!gamePaused) {
        intervalID = setInterval(() => {
            clearBoard();
            movePaddles();
            drawPaddles();
            moveBall();
            drawBall();
            checkCollision();
        }, 10);
    }
}

function clearBoard() {
    ctx.fillStyle = colors.board;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
    drawPaddle(paddle1, colors.paddle1);
    drawPaddle(paddle2, colors.paddle2);
}

function drawPaddle(paddle, color) {
    ctx.fillStyle = color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = colors.paddleBorder;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function createBall() {
    ballSpeed = 1;
    ballXDirection = Math.random() < 0.5 ? 1 : -1;
    ballYDirection = (Math.random() < 0.5 ? 1 : -1) * Math.random();
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballColor = colors.ballWhite; // Balle début blanche
    drawBall();
}

function moveBall() {
    ballX += ballSpeed * ballXDirection;
    ballY += ballSpeed * ballYDirection;
}

function drawBall() {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = colors.ballBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function checkCollision() {
    if (ballY <= ballRadius || ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1;
    }
    if (ballX <= 0 || ballX >= gameWidth) {
        if (ballX <= 0) {
            playerWins[player2Name]++;
            currentPlayer2Score++;
        } else {
            playerWins[player1Name]++;
            currentPlayer1Score++;
        }
        updateScore();
        createBall();
    }
    if (ballX <= paddle1.x + paddle1.width && ballX >= paddle1.x && ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
        ballXDirection *= -1;
        ballSpeed += 1;
        ballColor = colors.ballWhite;
        lastPlayerHit = 'player1';
    }
    if (ballX >= paddle2.x - ballRadius && ballX <= paddle2.x + paddle2.width && ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
        ballXDirection *= -1;
        ballSpeed += 1;
        ballColor = colors.ballBlack;
        lastPlayerHit = 'player2';
    }
}

function movePaddles() {
    if (keysPressed[90] && paddle1.y > 0) paddle1.y -= paddleSpeed; // Touche 'z'
    if (keysPressed[83] && paddle1.y < gameHeight - paddle1.height) paddle1.y += paddleSpeed; // Touche 's'
    if (keysPressed[38] && paddle2.y > 0) paddle2.y -= paddleSpeed; // Flèche vers le haut
    if (keysPressed[40] && paddle2.y < gameHeight - paddle2.height) paddle2.y += paddleSpeed; // Flèche vers le bas
}

function updateScore() {
    scoreText.textContent = `${player1Name}: ${currentPlayer1Score} - ${currentPlayer2Score} :${player2Name}`;
    updatePlayerScores();
    checkWinCondition();
}

function resetScores() {
    playerWins[player1Name] = 0;
    playerWins[player2Name] = 0;
    updateScore();
}

function updatePlayerScores() {
    const playerScoresElement = document.getElementById('playerScores');
    const classementElement = document.getElementById('classement');
    playerScoresElement.innerHTML = '';

    const playerScoresArray = Object.entries(playerWins);

    playerScoresArray.sort((a, b) => b[1] - a[1]);

    let hasScores = false;
    for (const [playerName, wins] of playerScoresArray) {
        if (wins > 0) {
            hasScores = true;
            const scoreListItem = document.createElement('li');
            scoreListItem.classList.add('player-list');
            scoreListItem.textContent = `${playerName}: Victoires - ${wins}`;
            playerScoresElement.appendChild(scoreListItem);
        }
    }

    classementElement.style.display = hasScores ? 'block' : 'none';
}

updatePlayerScores();

function checkWinCondition() {
    if (currentPlayer1Score >= 2 || currentPlayer2Score >= 2) {
        clearInterval(intervalID);
        gamePaused = true;
        const winner = currentPlayer1Score >= 2 ? player1Name : player2Name;
        modalMessage.textContent = `${winner} a gagné avec un score de ${currentPlayer1Score} contre ${currentPlayer2Score} !`;
        modal.style.display = "block";
        clearBoard();
    }
}

function resetGame() {
    paddle1.y = 0;
    paddle2.y = gameHeight - paddle2.height;
    updateScore();
    clearInterval(intervalID);
    clearBoard();
    gamePaused = false;
    startGame();
}
