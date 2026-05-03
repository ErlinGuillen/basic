// Blog Homepage //
const tabs = document.querySelectorAll('.tab-btn');

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
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸ Pause';
    } else {
        audio.pause();
        playBtn.textContent = '▶ Play';
    }
});
