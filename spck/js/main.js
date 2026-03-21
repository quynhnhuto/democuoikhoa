// Fetch songs data from JSON
let allSongs = [];

async function loadSongs() {
    try {
        const response = await fetch('./json/app.json');
        const data = await response.json();
        allSongs = data.songs;
        renderFeaturedSongs();
        renderTrendingSongs();
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Render Featured Songs
function renderFeaturedSongs() {
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;

    const featuredSongs = allSongs.slice(0, 4);
    
    featuredGrid.innerHTML = featuredSongs.map(song => `
        <div class="featured-card" onclick="goToSongDetail(${song.id})">
            <div class="card-image">
                <img src="${song.image}" alt="${song.title}">
                <button class="play-btn" onclick="event.stopPropagation(); playSongFromCard(${song.id})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        </div>
    `).join('');
}

// Render Trending Songs
function renderTrendingSongs() {
    const trendingList = document.querySelector('.trending-list');
    if (!trendingList) return;

    const trendingSongs = allSongs.sort((a, b) => b.likes - a.likes).slice(0, 5);
    
    trendingList.innerHTML = trendingSongs.map((song, index) => `
        <div class="trending-item" onclick="goToSongDetail(${song.id})">
            <div class="trending-rank">${index + 1}</div>
            <div class="trending-info">
                <img src="${song.image}" alt="${song.title}">
                <div>
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="trending-actions">
                <span class="duration">${song.duration}</span>
                <button class="icon-btn" onclick="event.stopPropagation(); toggleLike(event)">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="icon-btn" onclick="event.stopPropagation(); playSongFromCard(${song.id})">
                    <i class="fas fa-play-circle"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Navigate to song detail page
function goToSongDetail(songId) {
    window.location.href = `song-detail.html?id=${songId}`;
}

// Play song from card
function playSongFromCard(songId) {
    const song = allSongs.find(s => s.id === songId);
    if (song) {
        // Store current song in localStorage
        localStorage.setItem('currentSong', JSON.stringify(song));
        window.location.href = `song-detail.html?id=${songId}`;
    }
}

// Toggle like button
function toggleLike(event) {
    const btn = event.currentTarget;
    btn.classList.toggle('liked');
    btn.style.color = btn.classList.contains('liked') ? '#1DB954' : '#B3B3B3';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadSongs);
