//config.js se API key ko aa rhi h
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');

// Weather icon mapping
const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
};

async function getWeather(city) {
    loadingMessage.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

function displayWeather(data) {
    loadingMessage.classList.add('hidden');
    weatherInfo.classList.remove('hidden');

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;

    const weatherMain = data.weather[0].main;
    document.getElementById('weatherIcon').textContent = weatherIcons[weatherMain] || '🌡️';
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});