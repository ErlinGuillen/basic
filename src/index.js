const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

// Initial state: Hidden
startMenu.style.display = 'none';

startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents immediate closing
    if (startMenu.style.display === 'none') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
});

// Close menu if clicking outside on the "desktop"
document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.style.display = 'none';
    }
});