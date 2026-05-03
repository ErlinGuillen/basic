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
