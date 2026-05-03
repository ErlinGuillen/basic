const browserItem = document.querySelector('.item:nth-child(3)'); // 🌐 in menu
const browserWindow = document.getElementById('browserWindow');
const closeBrowser = document.getElementById('closeBrowser');
const browserFrame = document.getElementById('browserFrame');
const browserUrl = document.getElementById('browserUrl');
const goBtn = document.getElementById('goBtn');

// Open Browser
browserItem.addEventListener('click', () => {
    browserWindow.style.display = 'block';
    document.getElementById('startMenu').style.display = 'none';
});

// Close Browser
closeBrowser.addEventListener('click', () => {
    browserWindow.style.display = 'none';
});

// Navigation Logic
goBtn.addEventListener('click', () => {
    let url = browserUrl.value;
    if (!url.startsWith('http')) url = 'https://' + url;
    browserFrame.src = url;
});

// Dragging Logic
let isDraggingBr = false;
let offsetBrX, offsetBrY;
const brHeader = browserWindow.querySelector('.window-header');

brHeader.addEventListener('mousedown', (e) => {
    isDraggingBr = true;
    offsetBrX = e.clientX - browserWindow.offsetLeft;
    offsetBrY = e.clientY - browserWindow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDraggingBr) return;
    browserWindow.style.left = `${e.clientX - offsetBrX}px`;
    browserWindow.style.top = `${e.clientY - offsetBrY}px`;
});

document.addEventListener('mouseup', () => isDraggingBr = false);
