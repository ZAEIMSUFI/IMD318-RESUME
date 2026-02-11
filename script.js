/* ========================================
   SHARED JAVASCRIPT FOR ALL PAGES
========================================= */

let themeDropdownOpen = false;
let fontDropdownOpen = false;
let weatherDropdownOpen = false;
let marqueeVisible = false;

/* ===== WEATHER API ===== */
async function getWeather() {
    try {
        // Using OpenWeatherMap API - You need to replace 'YOUR_API_KEY' with your actual API key
        // Get one for free at: https://openweathermap.org/api
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        
        // Get user's location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.cod === 200) {
                    updateWeatherUI(data);
                } else {
                    console.error('Weather API error:', data.message);
                    setDefaultWeather();
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                // Fallback to default city (Kuala Lumpur)
                fetchWeatherByCity('Kuala Lumpur');
            });
        } else {
            // Fallback if geolocation not supported
            fetchWeatherByCity('Kuala Lumpur');
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        setDefaultWeather();
    }
}

async function fetchWeatherByCity(city) {
    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            updateWeatherUI(data);
        } else {
            setDefaultWeather();
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        setDefaultWeather();
    }
}

function updateWeatherUI(data) {
    // Update old weather widget (left side - if exists)
    const cityEl = document.getElementById('weatherCity');
    const descEl = document.getElementById('weatherDesc');
    const tempEl = document.getElementById('weatherTemp');
    const minEl = document.getElementById('weatherMin');
    const maxEl = document.getElementById('weatherMax');
    
    if (cityEl) cityEl.textContent = data.name;
    if (descEl) descEl.textContent = data.weather[0].description;
    if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    if (minEl) minEl.textContent = `${Math.round(data.main.temp_min)}°C`;
    if (maxEl) maxEl.textContent = `${Math.round(data.main.temp_max)}°C`;
    
    // Update new floating weather widget (right side)
    const cityFloatingEl = document.getElementById('weatherCityFloating');
    const descFloatingEl = document.getElementById('weatherDescFloating');
    const tempFloatingEl = document.getElementById('weatherTempFloating');
    const minFloatingEl = document.getElementById('weatherMinFloating');
    const maxFloatingEl = document.getElementById('weatherMaxFloating');
    
    if (cityFloatingEl) cityFloatingEl.textContent = data.name;
    if (descFloatingEl) descFloatingEl.textContent = data.weather[0].description;
    if (tempFloatingEl) tempFloatingEl.textContent = `${Math.round(data.main.temp)}°C`;
    if (minFloatingEl) minFloatingEl.textContent = `${Math.round(data.main.temp_min)}°C`;
    if (maxFloatingEl) maxFloatingEl.textContent = `${Math.round(data.main.temp_max)}°C`;
}

function setDefaultWeather() {
    // Update old weather widget
    const cityEl = document.getElementById('weatherCity');
    const descEl = document.getElementById('weatherDesc');
    const tempEl = document.getElementById('weatherTemp');
    const minEl = document.getElementById('weatherMin');
    const maxEl = document.getElementById('weatherMax');
    
    if (cityEl) cityEl.textContent = 'Kuala Lumpur';
    if (descEl) descEl.textContent = 'Partly Cloudy';
    if (tempEl) tempEl.textContent = '30°C';
    if (minEl) minEl.textContent = '26°C';
    if (maxEl) maxEl.textContent = '33°C';
    
    // Update new floating weather widget
    const cityFloatingEl = document.getElementById('weatherCityFloating');
    const descFloatingEl = document.getElementById('weatherDescFloating');
    const tempFloatingEl = document.getElementById('weatherTempFloating');
    const minFloatingEl = document.getElementById('weatherMinFloating');
    const maxFloatingEl = document.getElementById('weatherMaxFloating');
    
    if (cityFloatingEl) cityFloatingEl.textContent = 'Kuala Lumpur';
    if (descFloatingEl) descFloatingEl.textContent = 'Partly Cloudy';
    if (tempFloatingEl) tempFloatingEl.textContent = '30°C';
    if (minFloatingEl) minFloatingEl.textContent = '26°C';
    if (maxFloatingEl) maxFloatingEl.textContent = '33°C';
}

/* ===== THEME MANAGEMENT ===== */
function toggleThemeDropdown() {
    themeDropdownOpen = !themeDropdownOpen;
    document.getElementById('themeDropdown').classList.toggle('active', themeDropdownOpen);
    if (fontDropdownOpen) {
        fontDropdownOpen = false;
        document.getElementById('fontDropdown').classList.remove('active');
    }
    if (weatherDropdownOpen) {
        weatherDropdownOpen = false;
        document.getElementById('weatherDropdown').classList.remove('active');
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
    if (weatherDropdownOpen) {
        weatherDropdownOpen = false;
        document.getElementById('weatherDropdown').classList.remove('active');
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

/* ===== WEATHER DROPDOWN MANAGEMENT ===== */
function toggleWeatherDropdown() {
    weatherDropdownOpen = !weatherDropdownOpen;
    document.getElementById('weatherDropdown').classList.toggle('active', weatherDropdownOpen);
    if (themeDropdownOpen) {
        themeDropdownOpen = false;
        document.getElementById('themeDropdown').classList.remove('active');
    }
    if (fontDropdownOpen) {
        fontDropdownOpen = false;
        document.getElementById('fontDropdown').classList.remove('active');
    }
}

/* ===== MARQUEE TOGGLE ===== */
function toggleMarquee() {
    const marquee = document.getElementById('marqueeContainer');
    const toggle = document.getElementById('marqueeToggle');
    const icon = document.getElementById('marqueeToggleIcon');
    const datetime = document.querySelector('.datetime-widget');
    const weather = document.querySelector('.weather-widget');
    const controls = document.querySelector('.control-buttons');
    const page = document.querySelector('.page');
    
    marqueeVisible = !marqueeVisible;
    
    marquee.classList.toggle('visible', marqueeVisible);
    toggle.classList.toggle('visible', marqueeVisible);
    if (datetime) datetime.classList.toggle('marquee-visible', marqueeVisible);
    if (weather) weather.classList.toggle('marquee-visible', marqueeVisible);
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
    'https://open.spotify.com/embed/track/2OZVskV28xxJjjhQqKTLSg?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/5de9Ho64dovuQI8Uhn5gPD?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/3GVkPk8mqxz0itaAriG1L7?utm_source=generator&theme=0',
    'https://open.spotify.com/embed/track/46kspZSY3aKmwQe7O77fCC?utm_source=generator',
    'https://open.spotify.com/embed/track/4dTmQfqA75KrfynUF1TUX9?utm_source=generator'
];

let currentTrackIndex = parseInt(localStorage.getItem('spotify-track') || '0', 10);


function sanitizeSpotifyTrackIndex() {
    if (Number.isNaN(currentTrackIndex) || currentTrackIndex < 0 || currentTrackIndex >= spotifyTracks.length) {
        currentTrackIndex = 0;
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % spotifyTracks.length;
    updateSpotifyPlayer();
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + spotifyTracks.length) % spotifyTracks.length;
    updateSpotifyPlayer();
}

function updateSpotifyPlayer() {
    sanitizeSpotifyTrackIndex();
    const player = document.getElementById('spotifyPlayer');
    if (player) {
        player.src = spotifyTracks[currentTrackIndex];
        localStorage.setItem('spotify-track', currentTrackIndex);
    }
}

function toggleSpotify() {
    const widget = document.getElementById('spotifyWidget');
    const toggleBtn = document.querySelector('.spotify-toggle');
    
    if (widget.classList.contains('minimized')) {
        widget.classList.remove('minimized');
        toggleBtn.classList.remove('collapsed');
    } else {
        widget.classList.add('minimized');
        toggleBtn.classList.add('collapsed');
    }
}

/* ===== WEATHER WIDGET TOGGLE ===== */
function toggleWeatherWidget() {
    const widget = document.getElementById('weatherWidgetFloating');
    const controlBtnIcon = document.querySelector('.control-btn-main[onclick*="toggleWeatherWidget"] i');
    const toggleIcon = document.getElementById('weatherWidgetToggleIcon');
    
    if (widget.classList.contains('minimized')) {
        widget.classList.remove('minimized');
        if (controlBtnIcon) controlBtnIcon.className = 'fas fa-minus';
        if (toggleIcon) toggleIcon.className = 'fas fa-minus';
        localStorage.setItem('weather-widget-minimized', 'false');
    } else {
        widget.classList.add('minimized');
        if (controlBtnIcon) controlBtnIcon.className = 'fas fa-plus';
        if (toggleIcon) toggleIcon.className = 'fas fa-plus';
        localStorage.setItem('weather-widget-minimized', 'true');
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
    updateSpotifyPlayer();
    
    // Weather widget state
    const weatherMinimized = localStorage.getItem('weather-widget-minimized');
    if (weatherMinimized === 'true') {
        const widget = document.getElementById('weatherWidgetFloating');
        const controlBtnIcon = document.querySelector('.control-btn-main[onclick*="toggleWeatherWidget"] i');
        const toggleIcon = document.getElementById('weatherWidgetToggleIcon');
        if (widget) {
            widget.classList.add('minimized');
            if (controlBtnIcon) controlBtnIcon.className = 'fas fa-plus';
            if (toggleIcon) toggleIcon.className = 'fas fa-plus';
        }
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
    if (weatherDropdownOpen && !e.target.closest('.weather-selector')) {
        weatherDropdownOpen = false;
        document.getElementById('weatherDropdown').classList.remove('active');
    }
});

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Animate sections on scroll
    document.querySelectorAll('.featured-section, .hero-enhanced, .cta-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    initProfilePicture();
    initSkillBars();
    loadPreferences();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    getWeather();
    // Refresh weather every 10 minutes
    setInterval(getWeather, 600000);
    initScrollAnimations();
    checkBackgroundImage();
    checkBannerImage();
});

/* ===== CHECK FOR BACKGROUND IMAGE ===== */
function checkBackgroundImage() {
    const img = new Image();
    img.onload = function() {
        document.body.classList.add('has-background');
    };
    img.onerror = function() {
        // Background image doesn't exist, do nothing
        console.log('No bg.jpg found - using solid background');
    };
    img.src = 'bg.jpg';
}

/* ===== CHECK FOR BANNER IMAGE ===== */
function checkBannerImage() {
    const bannerImage = document.querySelector('.hero-banner-image');
    if (!bannerImage) return;
    
    const img = new Image();
    img.onload = function() {
        bannerImage.style.backgroundImage = 'url(banner.jpg)';
    };
    img.onerror = function() {
        // Banner image doesn't exist, gradient fallback already in CSS
        console.log('No banner.jpg found - using gradient background');
    };
    img.src = 'banner.jpg';
}
