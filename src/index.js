// Blog Homepage //
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const postBtn = document.getElementById('post-comment');
const commentInput = document.getElementById('user-comment');
const commentsDisplay = document.getElementById('comments-display');

postBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        const newComment = document.createElement('div'); // Changed to div for layout
        newComment.classList.add('comment');
        newComment.style.display = "flex";
        newComment.style.justifyContent = "space-between";
        
        newComment.innerHTML = `
            <span><strong>User:</strong> ${commentText}</span>
            <button class="delete-btn" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
        `;
        
        // Add delete functionality
        newComment.querySelector('.delete-btn').addEventListener('click', () => {
            newComment.remove();
        });

        commentsDisplay.prepend(newComment);
        commentInput.value = "";
    }
});

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

const latestDateLabel = document.querySelector('.post .date');
if (latestDateLabel) {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    latestDateLabel.innerText = today.toLocaleDateString('en-US', options).toUpperCase();
}
// Music App //
const songs = [
    { 
      title: "Animal I Have Become", 
      artist: "Three Days Grace", 
      src: "AnimalIHaveBecome.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "saraunh0ly", 
      artist: "wutiwant", 
      src: "wutiwant.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "Bensound", 
      artist: "Summer", 
      src: "Summer.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "Parry Gripp", 
      artist: "Raining Tacos", 
      src: "RainingTacos.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "BBpanzu", 
      artist: "Bang Bang Bang", 
      src: "BangBangBang.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "Alan Walker and Alok", 
      artist: "Headlights (ft. KIDDO)", 
      src: "Headlights.mp3", 
      art: "musicicon.png" 
    },
    { 
      title: "DJ KVNXD", 
      artist: "Nervy Funk", 
      src: "Nervy Funk.mp3", 
      art: "musicicon.png" 
    }
];

let userPlaylists = JSON.parse(localStorage.getItem('myCustomPlaylists')) || [];
let songIndex = 0;

const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn'); // ADD THIS
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const playlistNameInput = document.getElementById('playlist-name');
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistsContainer = document.getElementById('playlists-container');
const tracksList = document.getElementById('available-tracks');
const albumArt = document.querySelector('.album-art');
const musicCard = document.querySelector('.glass-card.music-app');


audio.addEventListener('ended', () => {
    nextBtn.click(); // This triggers your next song logic automatically!
});

createPlaylistBtn.addEventListener('click', () => {
    const name = playlistNameInput.value.trim();
    if (name) {
        const newPlaylist = { name: name, tracks: [] };
        userPlaylists.push(newPlaylist);
        renderPlaylists();
        playlistNameInput.value = "";
    }
});

prevBtn.addEventListener('click', () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    
    if (musicCard.classList.contains('playing')) {
        audio.play();
    }
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; 
    loadSong(songs[songIndex]);
    
    if (musicCard.classList.contains('playing')) {
        audio.play();
    }
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

window.addSongToCurrent = function(songIndex) {
    if (userPlaylists.length === 0) {
        alert("Please create a playlist first!");
        return;
    }
    
    // Add the song to the last playlist created
    const selectedSong = songs[songIndex];
    const targetPlaylist = userPlaylists[userPlaylists.length - 1];
    
    targetPlaylist.tracks.push(selectedSong);
    alert(`Added ${selectedSong.title} to ${targetPlaylist.name}`);
    renderPlaylists();
};

window.playPlaylist = function(playlistIndex) {
    const selectedPlaylist = userPlaylists[playlistIndex];
    
    if (selectedPlaylist.tracks.length === 0) {
        alert("This playlist is empty!");
        return;
    }
    
    loadSong(selectedPlaylist.tracks[0]);
    songIndex = 0;
    
    if (!audio.paused || musicCard.classList.contains('playing')) {
        audio.play();
    }
    
    alert(`Now playing playlist: ${selectedPlaylist.name}`);
};

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
    albumArt.style.backgroundImage = `url('${ song . art }')`;
}

function renderAvailableTracks() {
    tracksList.innerHTML = '<h4>Available Tracks</h4>';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.innerHTML = `
            <span>${song.title} - ${song.artist}</span>
            <button class="glass-btn small-btn" onclick="addSongToCurrent('${index}')">+</button>
        `;
        tracksList.appendChild(item);
    });
}

function renderPlaylists() {
    playlistsContainer.innerHTML = "";
    userPlaylists.forEach((pl, i) => {
        const div = document.createElement('div');
        div.className = 'playlist-card';
        div.innerHTML = `
            <strong>${pl.name}</strong> (${pl.tracks.length} songs)
            <button class="glass-btn" onclick="playPlaylist(${i})">Play This</button>
        `;
        playlistsContainer.appendChild(div);
    });
}

function togglePlay() {
    if (elements.audio.paused) {
        elements.audio.play();
        elements.playBtn.innerHTML = '<span>Pause</span>';
        elements.albumArt.classList.add('playing');
        elements.musicCard.classList.add('playing');
    } else {
        elements.audio.pause();
        elements.playBtn.innerHTML = '<span>Play</span>';
        elements.albumArt.classList.remove('playing');
        elements.musicCard.classList.remove('playing');
    }
}

renderAvailableTracks();
renderPlaylists();
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
