const musicItem = document.querySelector('.item:nth-child(2)'); // The Music item in menu
const musicWindow = document.getElementById('musicWindow');
const closeMusic = document.getElementById('closeMusic');

musicItem.addEventListener('click', () => {
    musicWindow.style.display = 'block';
    startMenu.style.display = 'none'; // Auto-close menu
});

closeMusic.addEventListener('click', () => {
    musicWindow.style.display = 'none';
});
