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

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸ Pause';
    } else {
        audio.pause();
        playBtn.textContent = '▶ Play';
    }
});
