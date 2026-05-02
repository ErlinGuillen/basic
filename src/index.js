const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

startBtn.addEventListener('click', () => {
    // Toggle visibility
    if (startMenu.style.display === 'none') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
});