const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

// Set the initial state
startMenu.style.display = 'none';

startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the click from hitting the document
    if (startMenu.style.display === 'none') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
});

// Close the menu if you click the "Desktop" background
document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.style.display = 'none';
    }
});