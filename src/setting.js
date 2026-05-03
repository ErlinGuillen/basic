// 1. Declare Variables with unique names
const settingsItem = document.querySelector('.item:nth-child(1)'); 
const settingsWindow = document.getElementById('settingsWindow');
const closeSettings = document.getElementById('closeSettings');
const settingsMenu = document.getElementById('startMenu');
const settingsHeader = settingsWindow.querySelector('.window-header');

// 2. Open/Close Logic
settingsItem.addEventListener('click', () => {
    settingsWindow.style.display = 'block';
    settingsMenu.style.display = 'none';
});

closeSettings.addEventListener('click', () => {
    settingsWindow.style.display = 'none';
});

// 3. Wallpaper Switcher Function
window.changeWall = (type) => {
    const body = document.body;
    if(type === 'forest') body.style.backgroundImage = "url('image/forest.jpg')";
    if(type === 'ocean') body.style.backgroundImage = "url('image/ocean.jpg')";
    if(type === 'night') body.style.backgroundImage = "url('image/night.webp')";
};

// 4. Unique Dragging Logic for Settings
let isDraggingSet = false;
let offsetSetX, offsetSetY;

settingsHeader.addEventListener('mousedown', (e) => {
    isDraggingSet = true;
    offsetSetX = e.clientX - settingsWindow.offsetLeft;
    offsetSetY = e.clientY - settingsWindow.offsetTop;
    settingsHeader.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDraggingSet) return;
    settingsWindow.style.left = `${e.clientX - offsetSetX}px`;
    settingsWindow.style.top = `${e.clientY - offsetSetY}px`;
});

document.addEventListener('mouseup', () => {
    isDraggingSet = false;
    settingsHeader.style.cursor = 'move';
});
