// 1. Declare variables ONCE
const musicItem = document.querySelector('.item:nth-child(2)');
const musicWindow = document.getElementById('musicWindow');
const closeMusic = document.getElementById('closeMusic');
const menu = document.getElementById('startMenu');
const header = musicWindow.querySelector('.window-header');
const playBtn = document.getElementById('mainPlayBtn');
const audio = document.getElementById('audioPlayer');

let isPlaying = false; // Added this missing declaration

// 2. Open/Close Logic
musicItem.addEventListener('click', () => {
    musicWindow.style.display = 'block';
    menu.style.display = 'none';
});

closeMusic.addEventListener('click', () => {
    musicWindow.style.display = 'none';
    audio.pause(); // Optional: Stop music when closing
});

// 3. Dragging Logic
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

// 4. Real Audio Logic
playBtn.addEventListener('click', () => {
    const albumArt = document.querySelector('.album-art');
    if (!isPlaying) {
        audio.play();
        playBtn.innerText = "⏸";
        isPlaying = true;
        albumArt.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        isPlaying = false;
        albumArt.classList.remove('playing');
    }
});

audio.onended = () => {
    isPlaying = false;
    playBtn.innerText = "▶";
    document.querySelector('.album-art').classList.remove('playing');
};
