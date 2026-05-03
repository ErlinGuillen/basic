const musicItem = document.querySelector('.item:nth-child(2)');
const musicWindow = document.getElementById('musicWindow');
const closeMusic = document.getElementById('closeMusic');
const menu = document.getElementById('startMenu');
const header = musicWindow.querySelector('.window-header');

musicItem.addEventListener('click', () => {
    musicWindow.style.display = 'block';
    menu.style.display = 'none'; // Use 'menu' here too!
});

closeMusic.addEventListener('click', () => {
    musicWindow.style.display = 'none';
});

let isDragging = false;
let offsetX, offsetY;

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - musicWindow.offsetLeft;
    offsetY = e.clientY - musicWindow.offsetTop;
    header.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    musicWindow.style.left = `${e.clientX - offsetX}px`;
    musicWindow.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = 'move';
});
