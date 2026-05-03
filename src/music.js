// 1. Declare variables ONCE
const musicItem = document.querySelector('.item:nth-child(2)');
const musicWindow = document.getElementById('musicWindow');
const closeMusic = document.getElementById('closeMusic');
const menu = document.getElementById('startMenu');
const header = musicWindow.querySelector('.window-header');
const playBtn = document.getElementById('mainPlayBtn');
const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const volumeControl = document.getElementById('volumeControl');

let isPlaying = false; // Added this missing declaration

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    if (audio.duration) {
        progressBar.style.width = `${progressPercent}%`;
    }
})

// Inside the musicItem click listener:
musicItem.addEventListener('click', () => {
    musicWindow.style.display = 'block';
    menu.style.display = 'none';
    musicItem.classList.add('active'); // Light up the icon
});

// Inside the closeMusic click listener:
closeMusic.addEventListener('click', () => {
    musicWindow.style.display = 'none';
    musicItem.classList.remove('active'); // Turn off the light
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
        document.title = "Now Playing: Forest Melodies";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        isPlaying = false;
        albumArt.classList.remove('playing');
        document.title = "Basic OS";
    }
});

progressContainer.addEventListener('click', (e) => {
    if (isNaN(audio.duration)) return; // Don't do anything if audio isn't loaded
    
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

window.loadSong = (name, path) => {
    const titleDisplay = document.querySelector('.song-title');
    const albumArt = document.querySelector('.album-art');
    
    audio.src = path;
    titleDisplay.innerText = name;
    
    // Auto-play the new song
    audio.play();
    isPlaying = true;
    playBtn.innerText = "⏸";
    albumArt.classList.add('playing');
    document.title = "Now Playing: " + name;
};

audio.onended = () => {
    isPlaying = false;
    playBtn.innerText = "▶";
    document.querySelector('.album-art').classList.remove('playing');
};
