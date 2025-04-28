
// weather.js

const API_KEY = '822f6551e40cbf77ffe455d6620933e3'; // <-- Remplace par ta clé API OpenWeatherMap

// Fonction pour récupérer les données météo
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fr`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ville non trouvée');
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

// Fonction pour mettre à jour le DOM
function updateWeatherUI(data) {
    const cityCountry = `${data.name}, ${data.sys.country}`;

    // Mise à jour des lieux
    const locationH4 = document.querySelector('.selected-location h4');
    const locationSpan = document.querySelector('span.bold-text');

    if (locationH4) locationH4.textContent = cityCountry;
    if (locationSpan) locationSpan.textContent = cityCountry;

    // Mise à jour de la température principale
    const temperatureElement = document.querySelector('.selected-location h1');
    if (temperatureElement) temperatureElement.textContent = `${Math.round(data.main.temp)}°`;

    // Mise à jour de la condition météo principale
    const conditionElement = document.querySelector('.selected-location h6');
    if (conditionElement) conditionElement.textContent = data.weather[0].description;

    // Mise à jour des Highlights
    const highlights = {
        feelLike: document.querySelectorAll('.today-highlight-card h4')[0],
        cloudCover: document.querySelectorAll('.today-highlight-card h4')[1],
        rainChance: document.querySelectorAll('.today-highlight-card h4')[2],
        humidity: document.querySelectorAll('.today-highlight-card h4')[3],
        uvIndex: document.querySelectorAll('.today-highlight-card h4')[4],
        windSpeed: document.querySelectorAll('.today-highlight-card h4')[5]
    };

    if (highlights.feelLike) highlights.feelLike.textContent = `${Math.round(data.main.feels_like)}°`;
    if (highlights.cloudCover) highlights.cloudCover.textContent = `${data.clouds.all}%`;
    if (highlights.rainChance) highlights.rainChance.textContent = `${data.weather[0].main === 'Rain' ? '100%' : '0%'}`;
    if (highlights.humidity) highlights.humidity.textContent = `${data.main.humidity}%`;
    if (highlights.uvIndex) highlights.uvIndex.textContent = 'N/A'; // UV non disponible dans cette API simple
    if (highlights.windSpeed) highlights.windSpeed.innerHTML = `${Math.round(data.wind.speed * 3.6)} <span class="color-black n-text">km/h</span>`;
}

// Gestion du bouton de recherche
document.getElementById('searchButton').addEventListener('click', async function () {
    const city = document.getElementById('searchInput').value.trim();
    if (city !== '') {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
            updateWeatherUI(weatherData);
        }
    } else {
        alert('Veuillez entrer une ville.');
    }
});
