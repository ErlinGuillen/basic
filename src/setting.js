const settingsItem = document.querySelector('.item:nth-child(1)'); // Settings item in menu
const settingsWindow = document.getElementById('settingsWindow');
const closeSettings = document.getElementById('closeSettings');

settingsItem.addEventListener('click', () => {
    settingsWindow.style.display = 'block';
    menu.style.display = 'none';
});

closeSettings.addEventListener('click', () => {
    settingsWindow.style.display = 'none';
});

// Wallpaper Switcher Function
window.changeWall = (type) => {
    const body = document.body;
    if(type === 'forest') body.style.backgroundImage = "url('image/forest.jpg')";
    if(type === 'ocean') body.style.backgroundImage = "url('https://images.unsplash.com/photo-1505118380757-91f5f5832de0?q=80&w=1500')";
    if(type === 'night') body.style.backgroundImage = "url('https://images.unsplash.com/photo-1472552947727-b42ff75d7931?q=80&w=1500')";
};

const settingsHeader = settingsWindow.querySelector('.window-header');

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

