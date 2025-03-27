class PongGame {
    constructor() {
        this.ball = document.querySelector('.ball');
        this.player1Paddle = document.getElementById('player1-paddle');
        this.player2Paddle = document.getElementById('player2-paddle');
        this.player1Score = document.getElementById('player1-score');
        this.player2Score = document.getElementById('player2-score');
        this.gameOverlay = document.querySelector('.game-overlay');
        this.messageDisplay = document.querySelector('.message');
        
        this.ballSpeed = { x: 5, y: 5 };
        this.ballPos = { x: 50, y: 50 };
        this.paddle1Pos = 50;
        this.paddle2Pos = 50;
        this.scores = { player1: 0, player2: 0 };
        
        this.gameMode = localStorage.getItem('gameMode') || 'One Player';
        this.isGamePaused = true;
        this.isSoundEnabled = localStorage.getItem('soundEnabled') === 'true';
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isGamePaused) {
                this.startGame();
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            const gameBoard = document.getElementById('game-board');
            const rect = gameBoard.getBoundingClientRect();
            const relativeY = (e.clientY - rect.top) / rect.height * 100;
            this.paddle1Pos = Math.max(10, Math.min(90, relativeY));
        });
        
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
    
    }
    
    startGame() {
        this.isGamePaused = false;
        this.gameOverlay.style.display = 'none';
        this.gameLoop();
    }
    
    togglePause() {
        this.isGamePaused = !this.isGamePaused;
        if (this.isGamePaused) {
            this.gameOverlay.style.display = 'flex';
            this.messageDisplay.textContent = 'Game Paused';
        } else {
            this.gameOverlay.style.display = 'none';
            this.gameLoop();
        }
    }
    
    updateBall() {
        this.ballPos.x += this.ballSpeed.x;
        this.ballPos.y += this.ballSpeed.y;
        
        // Ball collision with top and bottom
        if (this.ballPos.y <= 0 || this.ballPos.y >= 100) {
            this.ballSpeed.y *= -1;
        }
        
        // Ball collision with paddles
        if (this.checkPaddleCollision()) {
            this.ballSpeed.x *= -1.1; // Increase speed slightly
            if (this.isSoundEnabled) {
                this.playSound('hit');
            }
        }
        
        // Score points
        if (this.ballPos.x <= 0) {
            this.scores.player2++;
            this.resetBall();
        } else if (this.ballPos.x >= 100) {
            this.scores.player1++;
            this.resetBall();
        }
        
        this.ball.style.left = `${this.ballPos.x}%`;
        this.ball.style.top = `${this.ballPos.y}%`;
    }
    
    checkPaddleCollision() {
        const ballRect = this.ball.getBoundingClientRect();
        const paddle1Rect = this.player1Paddle.getBoundingClientRect();
        const paddle2Rect = this.player2Paddle.getBoundingClientRect();
        
        return (
            (this.ballSpeed.x < 0 && this.isColliding(ballRect, paddle1Rect)) ||
            (this.ballSpeed.x > 0 && this.isColliding(ballRect, paddle2Rect))
        );
    }
    
    isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }
    
    updateAI() {
        if (this.gameMode === 'One Player') {
            const targetPos = this.ballPos.y;
            const currentPos = parseFloat(this.player2Paddle.style.top) || 50;
            const diff = targetPos - currentPos;
            this.paddle2Pos = currentPos + diff * 0.1;
            this.player2Paddle.style.top = `${this.paddle2Pos}%`;
        }
    }
    
    resetBall() {
        this.ballPos = { x: 50, y: 50 };
        this.ballSpeed = {
            x: 5 * (Math.random() > 0.5 ? 1 : -1),
            y: 5 * (Math.random() > 0.5 ? 1 : -1)
        };
        this.updateScore();
    }
    
    updateScore() {
        this.player1Score.textContent = this.scores.player1;
        this.player2Score.textContent = this.scores.player2;
    }
    
    playSound(type) {
        // Add sound implementation here
    }
    
    gameLoop() {
        if (!this.isGamePaused) {
            this.updateBall();
            this.updateAI();
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
   // Game Start
    startBtn.addEventListener('click', () => {
        const gameMode = document.querySelector('.player-mode.active')?.textContent || 'One Player';
        localStorage.setItem('gameMode', gameMode);
        window.location.href = './game-page.html'; // Updated path to game page
    });

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new PongGame();
});