class PongGame {
    constructor(canvas) {
        // ... existing constructor code ...
        this.setupTimer();
    }

    setupTimer() {
        this.timeLeft = 120; // 2 minutes in seconds
        this.timerElement = document.getElementById('timer');
        this.gameOverOverlay = document.getElementById('gameOverOverlay');
        
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                const minutes = Math.floor(this.timeLeft / 60);
                const seconds = this.timeLeft % 60;
                this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                if (this.timeLeft <= 0) {
                    this.gameOver();
                }
            }
        }, 1000);
    }

    gameOver() {
        clearInterval(this.timerInterval);
        this.isPaused = true;
        this.gameOverOverlay.style.display = 'flex';
        
        // Add space bar listener for returning to menu
        const spaceHandler = (e) => {
            if (e.code === 'Space') {
                window.location.href = 'index.html';
                document.removeEventListener('keydown', spaceHandler);
            }
        };
        document.addEventListener('keydown', spaceHandler);
    }

    handleKeyDown(e) {
        if (this.timeLeft <= 0) return; // Disable controls if game is over
        
        switch(e.key) {
            case 'ArrowUp': this.controls.upPressed = true; break;
            case 'ArrowDown': this.controls.downPressed = true; break;
            case 'w': this.controls.wPressed = true; break;
            case 's': this.controls.sPressed = true; break;
            case 'Escape': 
                if(confirm('Return to main menu?')) {
                    window.location.href = 'index.html';
                }
                break;
        }
    }

    cleanup() {
        clearInterval(this.timerInterval);
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new PongGame(canvas);
    const pauseBtn = document.getElementById('pause-btn');

    pauseBtn.addEventListener('click', () => {
        game.isPaused = !game.isPaused;
        pauseBtn.textContent = game.isPaused ? 'Resume' : 'Pause';
    });

    function gameLoop() {
        game.update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Cleanup when leaving page
    window.addEventListener('beforeunload', () => {
        game.cleanup();
    });
});