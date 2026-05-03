const musicItem = document.querySelector('.item:nth-child(2)');
const musicWindow = document.getElementById('musicWindow');
const closeMusic = document.getElementById('closeMusic');
const menu = document.getElementById('startMenu'); // Variable is 'menu'

musicItem.addEventListener('click', () => {
    musicWindow.style.display = 'block';
    menu.style.display = 'none'; // Use 'menu' here too!
});

closeMusic.addEventListener('click', () => {
    musicWindow.style.display = 'none';
});
