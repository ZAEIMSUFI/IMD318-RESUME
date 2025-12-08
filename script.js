/* ========================================
   SHARED JAVASCRIPT FOR ALL PAGES
========================================= */

let themeDropdownOpen = false;
let fontDropdownOpen = false;
let marqueeVisible = false;

/* ===== THEME MANAGEMENT ===== */
function toggleThemeDropdown() {
    themeDropdownOpen = !themeDropdownOpen;
    document.getElementById('themeDropdown').classList.toggle('active', themeDropdownOpen);
    if (fontDropdownOpen) {
        fontDropdownOpen = false;
        document.getElementById('fontDropdown').classList.remove('active');
    }
}

function setTheme(theme, element) {
    document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-red', 'theme-orange', 'theme-teal', 'theme-rose');
    if (theme) document.body.classList.add('theme-' + theme);
    
    document.querySelectorAll('#themeDropdown .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    localStorage.setItem('portfolio-theme', theme);
    toggleThemeDropdown();
}

/* ===== FONT MANAGEMENT ===== */
function toggleFontDropdown() {
    fontDropdownOpen = !fontDropdownOpen;
    document.getElementById('fontDropdown').classList.toggle('active', fontDropdownOpen);
    if (themeDropdownOpen) {
        themeDropdownOpen = false;
        document.getElementById('themeDropdown').classList.remove('active');
    }
}

function setFont(font, element) {
    document.body.classList.remove('font-modern', 'font-classic', 'font-pixel', 'font-script', 'font-mono', 'font-sporty');
    if (font) document.body.classList.add('font-' + font);
    
    document.querySelectorAll('#fontDropdown .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    localStorage.setItem('portfolio-font', font);
    toggleFontDropdown();
}

/* ===== MARQUEE TOGGLE ===== */
function toggleMarquee() {
    const marquee = document.getElementById('marqueeContainer');
    const toggle = document.getElementById('marqueeToggle');
    const icon = document.getElementById('marqueeToggleIcon');
    const datetime = document.querySelector('.datetime-widget');
    const controls = document.querySelector('.control-buttons');
    const page = document.querySelector('.page');
    
    marqueeVisible = !marqueeVisible;
    
    marquee.classList.toggle('visible', marqueeVisible);
    toggle.classList.toggle('visible', marqueeVisible);
    if (datetime) datetime.classList.toggle('marquee-visible', marqueeVisible);
    if (controls) controls.classList.toggle('marquee-visible', marqueeVisible);
    if (page) page.classList.toggle('marquee-visible', marqueeVisible);
    
    icon.className = marqueeVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    localStorage.setItem('marquee-visible', marqueeVisible);
}

/* ===== DATE & TIME ===== */
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    if (dateElement) dateElement.textContent = now.toLocaleDateString('en-US', options);
    if (timeElement) {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${h}:${m}:${s}`;
    }
}

/* ===== SPOTIFY PLAYER ===== */
const spotifyTracks = [
    'https://open.spotify.com/embed/track/46kspZSY3aKmwQe7O77fCC?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/2OZVskV28xxJjjhQqKTLSg?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/5de9Ho64dovuQI8Uhn5gPD?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/7AQim7LbvFVZJE3O8TYgf2?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/3GVkPk8mqxz0itaAriG1L7?utm_source=generator&theme=0'
];

let currentTrackIndex = parseInt(localStorage.getItem('spotify-track') || '0');

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % spotifyTracks.length;
    updateSpotifyPlayer();
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + spotifyTracks.length) % spotifyTracks.length;
    updateSpotifyPlayer();
}

function updateSpotifyPlayer() {
    const player = document.getElementById('spotifyPlayer');
    if (player) {
        player.src = spotifyTracks[currentTrackIndex];
        localStorage.setItem('spotify-track', currentTrackIndex);
    }
}

function toggleSpotify() {
    const widget = document.getElementById('spotifyWidget');
    const icon = document.getElementById('spotifyToggleIcon');
    
    if (widget) {
        const isMinimized = widget.classList.toggle('minimized');
        if (icon) icon.className = isMinimized ? 'fas fa-plus' : 'fas fa-minus';
    }
}

/* ===== PROFILE PICTURE ===== */
function initProfilePicture() {
    const img = document.getElementById('profileImage');
    const avatar = document.getElementById('profileAvatar');
    if (img && avatar) {
        img.onload = () => avatar.classList.add('has-image');
        img.onerror = () => { img.style.display = 'none'; avatar.classList.remove('has-image'); };
    }
}

/* ===== SKILL BAR ANIMATIONS ===== */
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-bar-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => fill.style.width = width, 100);
                }
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skill').forEach(skill => observer.observe(skill));
}

/* ===== LOAD PREFERENCES ===== */
function loadPreferences() {
    // Theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.classList.add('theme-' + savedTheme);
        const opt = document.querySelector(`#themeDropdown .dropdown-option[onclick*="'${savedTheme}'"]`);
        if (opt) {
            document.querySelectorAll('#themeDropdown .dropdown-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        }
    }
    
    // Font
    const savedFont = localStorage.getItem('portfolio-font');
    if (savedFont) {
        document.body.classList.add('font-' + savedFont);
        const opt = document.querySelector(`#fontDropdown .dropdown-option[onclick*="'${savedFont}'"]`);
        if (opt) {
            document.querySelectorAll('#fontDropdown .dropdown-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        }
    }
    
    // Marquee - Start hidden by default, only show if previously enabled
    if (localStorage.getItem('marquee-visible') === 'true') {
        toggleMarquee();
    }
    
    // Spotify track
    const player = document.getElementById('spotifyPlayer');
    if (player && currentTrackIndex > 0) {
        player.src = spotifyTracks[currentTrackIndex];
    }
}

/* ===== CLOSE DROPDOWNS ON CLICK OUTSIDE ===== */
document.addEventListener('click', (e) => {
    if (themeDropdownOpen && !e.target.closest('.theme-selector')) {
        themeDropdownOpen = false;
        document.getElementById('themeDropdown').classList.remove('active');
    }
    if (fontDropdownOpen && !e.target.closest('.font-selector')) {
        fontDropdownOpen = false;
        document.getElementById('fontDropdown').classList.remove('active');
    }
});

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    initProfilePicture();
    initSkillBars();
    loadPreferences();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});