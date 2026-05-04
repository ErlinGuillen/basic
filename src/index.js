// Blog Homepage //
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');
        contents.forEach(content => {
            content.style.display = (content.id === target) ? 'block' : 'none';
        });
    });
});
// Music App //
const songs = [
    { title: "Animal I Have Become", artist: "Three Days Grace", src: "AnimalIHaveBecome.mp3", art: "musicicon.png" },
    { title: "saraunh0ly", artist: "wutiwant", src: "wutiwant.mp3", art: "musicicon.png" },
    { title: "Bensound", artist: "Summer", src: "Summer.mp3", art: "musicicon.png" }
];

let songIndex = 0;

const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn'); // ADD THIS
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const albumArt = document.querySelector('.album-art');
const musicCard = document.querySelector('.glass-card.music-app');

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; 
    loadSong(songs[songIndex]);
    audio.play();
});

progressBar.addEventListener('input', () => {   
    if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    }
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

if (audio) {
    audio.addEventListener('loadedmetadata', () => {
        let mins = Math.floor(audio.duration / 60);
        let secs = Math.floor(audio.duration % 60);
        durationEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration && isFinite(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.value = progress;
        }
    
        let mins = Math.floor(audio.currentTime / 60);
        let secs = Math.floor(audio.currentTime % 60);
        if (currentTimeEl) currentTimeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    });
}

if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
        // Debugging: check in console if file is found
        console.log("Attempting to play:", audio.currentSrc);

        if (audio.paused) {
            audio.play().then(() => {
                playBtn.innerHTML = '<span>⏸ Pause</span>';
                albumArt.classList.add('playing');
                musicCard.classList.add('playing');
            }).catch(error => {
                console.error("Playback failed. Error:", error);
                // If it fails, try to 'load' it first
                audio.load();
                audio.play();
            });
        } else {
            audio.pause();
            playBtn.innerHTML = '<span>▶ Play</span>';
            albumArt.classList.remove('playing');
            musicCard.classList.remove('playing');
        }
    });
}

function loadSong(song) {
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.artist-name').textContent = song.artist;
    audio.src = song.src;
    albumArt.style.backgroundImage = `url('${song.art}')`;
}
// Light/Dark Mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save the preference to local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
