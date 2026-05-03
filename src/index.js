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
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

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
        const progress = (audio.currentTime / audio.duration) * 100;
        if (progressBar) progressBar.value = progress;
        
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
            }).catch(error => {
                console.error("Playback failed. Error:", error);
                // If it fails, try to 'load' it first
                audio.load();
                audio.play();
            });
        } else {
            audio.pause();
            playBtn.innerHTML = '<span>▶ Play</span>';
        }
    });
}
