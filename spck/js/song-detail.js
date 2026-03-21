// Global variables
let allSongs = [];
let currentSongId = null;
let currentSongIndex = 0;
let isPlaying = false;

// DOM elements
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressFill = document.getElementById('progressFill');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');

// Load songs data
async function loadSongs() {
    try {
        const response = await fetch('./json/app.json');
        const data = await response.json();
        allSongs = data.songs;
        
        // Get song ID from URL
        const params = new URLSearchParams(window.location.search);
        currentSongId = parseInt(params.get('id'));
        
        // Find current song index
        currentSongIndex = allSongs.findIndex(s => s.id === currentSongId);
        
        if (currentSongIndex !== -1) {
            loadSongDetail();
            renderMiniPlaylist();
            renderRelatedSongs();
        }
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Load song detail
function loadSongDetail() {
    const song = allSongs[currentSongIndex];
    if (!song) return;

    // Update info section
    document.getElementById('songImage').src = song.image;
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.artist;
    document.getElementById('songYear').textContent = song.year;
    document.getElementById('songGenre').textContent = song.genre;
    document.getElementById('songLikes').textContent = song.likes.toLocaleString();

    // Update player section
    document.getElementById('playerImage').src = song.image;
    document.getElementById('playerTitle').textContent = song.title;
    document.getElementById('playerArtist').textContent = song.artist;

    // Set audio source
    audio.src = song.audioUrl;
    audio.crossOrigin = "anonymous";

    // Update duration
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // Update progress
    audio.addEventListener('timeupdate', updateProgress);
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

// Update play state
audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audio;
    const percent = (currentTime / duration) * 100;
    progressFill.style.width = percent + '%';
    currentTimeDisplay.textContent = formatTime(currentTime);
}

// Seek audio
progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Volume control
volumeSlider.addEventListener('change', (e) => {
    audio.volume = e.target.value / 100;
});

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % allSongs.length;
    currentSongId = allSongs[currentSongIndex].id;
    loadSongDetail();
    audio.play();
}

// Previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
    currentSongId = allSongs[currentSongIndex].id;
    loadSongDetail();
    audio.play();
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Toggle like
function toggleLikeSong() {
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.classList.toggle('liked');
}

// Render mini playlist
function renderMiniPlaylist() {
    const miniPlaylist = document.getElementById('miniPlaylist');
    miniPlaylist.innerHTML = allSongs.map((song, index) => `
        <div class="mini-playlist-item ${song.id === currentSongId ? 'active' : ''}" onclick="selectSong(${index})">
            <div class="mini-item-info">
                <p>${song.title}</p>
                <small>${song.artist}</small>
            </div>
            <span class="mini-item-duration">${song.duration}</span>
        </div>
    `).join('');
}

// Select song from mini playlist
function selectSong(index) {
    currentSongIndex = index;
    currentSongId = allSongs[index].id;
    loadSongDetail();
    renderMiniPlaylist();
    audio.play();
}

// Render related songs
function renderRelatedSongs() {
    const song = allSongs[currentSongIndex];
    const relatedSongs = allSongs.filter(s => s.genre === song.genre && s.id !== song.id).slice(0, 4);
    
    const relatedGrid = document.getElementById('relatedSongs');
    relatedGrid.innerHTML = relatedSongs.map(s => `
        <div class="related-song-card" onclick="goToSong(${s.id})">
            <div class="related-image">
                <img src="${s.image}" alt="${s.title}">
                <button class="related-play-btn" onclick="event.stopPropagation(); playSong(${s.id})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <h4>${s.title}</h4>
            <p>${s.artist}</p>
            <div class="related-footer">
                <span>${s.duration}</span>
                <span><i class="fas fa-heart"></i> ${s.likes}</span>
            </div>
        </div>
    `).join('');
}

// Go to different song
function goToSong(songId) {
    window.location.href = `song-detail.html?id=${songId}`;
}

// Play song
function playSong(songId) {
    currentSongIndex = allSongs.findIndex(s => s.id === songId);
    currentSongId = songId;
    loadSongDetail();
    renderMiniPlaylist();
    audio.play();
}

// Initialize
document.addEventListener('DOMContentLoaded', loadSongs);

// Auto play
audio.addEventListener('ended', nextSong);
