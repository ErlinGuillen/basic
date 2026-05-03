const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

// Ensure it starts hidden
startMenu.style.display = 'none';

startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from closing the menu immediately
    
    if (startMenu.style.display === 'none') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
});

// Close the menu if you click the background
document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.style.display = 'none';
    }
});

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Run immediately
