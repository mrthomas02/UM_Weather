const apiKey = 'df96c405c838d91f327a0bd7f418fbae';
const submitBtn = document.getElementById('submit-btn');
const cityInput = document.getElementById('city-input');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');
const weatherIconDisplay = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        console.log(`City entered: ${city}`);
        getWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name!';
        console.log('No city name provided');
    }
});

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(`API URL: ${apiURL}`);
    
    try {
        const response = await fetch(apiURL);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the name and try again.');
            } else {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
        }

        const data = await response.json();
        console.log('Weather data received:', data);
        displayWeatherData(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        console.log('Error fetching data:', error.message);
    }
}

function displayWeatherData(data) {
    errorMessage.textContent = '';

    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    
    temperatureDisplay.textContent = `Temperature: ${data.main.temp} °C`;
    
    descriptionDisplay.textContent = `Weather: ${data.weather[0].description}`;
    
    weatherIconDisplay.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
