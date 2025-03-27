document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const soundToggle = document.getElementById('sound-toggle');
    const startBtn = document.querySelector('.start-btn');
    const playerBtns = document.querySelectorAll('.player-mode');
    
    let isSoundOn = true;
    
    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('bright-theme');
        themeToggle.classList.toggle('active');
        const text = themeToggle.querySelector('.toggle-text');
        text.textContent = document.body.classList.contains('bright-theme') ? 'DARK' : 'BRIGHT';
    });
    
    // Sound Toggle
    soundToggle.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        soundToggle.classList.toggle('active');
        const text = soundToggle.querySelector('.toggle-text');
        text.textContent = isSoundOn ? 'ON' : 'OFF';
        localStorage.setItem('soundEnabled', isSoundOn);
    });
    
    // Game Start
    startBtn.addEventListener('click', () => {
        const gameMode = document.querySelector('.player-mode.active')?.textContent || 'One Player';
        localStorage.setItem('gameMode', gameMode);
    });
    
    // Player Mode Selection
    playerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playerBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});