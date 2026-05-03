const musicWindow = document.getElementById('musicWindow');
const header = musicWindow.querySelector('.window-header');

let isDragging = false;
let offsetX, offsetY;

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Calculate the distance between the mouse and the top-left of the window
    offsetX = e.clientX - musicWindow.offsetLeft;
    offsetY = e.clientY - musicWindow.offsetTop;
    
    // Change cursor to show movement
    header.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Move the window based on mouse position
    musicWindow.style.left = `${e.clientX - offsetX}px`;
    musicWindow.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = 'move';
});
