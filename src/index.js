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
// Music Player Logic
if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            // .play() returns a promise, we should catch errors (like 404s)
            audio.play().then(() => {
                playBtn.textContent = '⏸ Pause';
            }).catch(error => {
                console.error("Playback failed:", error);
                alert("Song file not found. Check your file path!");
            });
        } else {
            audio.pause();
            playBtn.textContent = '▶ Play';
        }
    });
}
