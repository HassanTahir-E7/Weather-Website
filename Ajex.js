const cities = [
    { name: "Lahore", lat: 31.54972, lon: 74.34361 },
    { name: "Islamabad", lat: 33.72148, lon: 73.04329 },
    { name: "Karachi", lat: 24.860966, lon: 66.990501 },
    { name: "Dhaka", lat: 23.8103, lon: 90.4125 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Colombo", lat: 6.9271, lon: 79.8612 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 }
];

// API Key
const apiKey = 'b1a010b2aabf812ec55c24d03e01c2f1';


function populateDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    cities.forEach(city => {
        const cityLink = document.createElement("a");
        cityLink.href = "#";
        cityLink.id = city.name.toLowerCase().replace(/\s+/g, '');
        cityLink.textContent = city.name;
        cityLink.addEventListener("click", function(event) {
            event.preventDefault(); 
            fetchWeather(city.name); 
        });
        dropdownContent.appendChild(cityLink);
    });
}


function fetchWeather(cityName) {
    const city = cities.find(c => c.name === cityName);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`;
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeatherData(data);
        } else if (xhr.readyState === 4) {
            console.error(`Error fetching weather data for ${cityName}`);
        }
    };
    xhr.send();
}

function displayWeatherData(data) {
    const weatherDiv = document.getElementById("weather-data");
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Clear previous weather data
    weatherDiv.innerHTML = `
        <div class="weather-city">
            <h3>${data.name}</h3>
            <img src="${iconUrl}" alt="Weather icon">
            <div class="temp">${(data.main.temp - 273.15).toFixed(2)} °C</div>
            <p class="description">${data.weather[0].description}</p>
            <div class="info-section">
                <div>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                </div>
                <div>
                    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                    <p><strong>Visibility:</strong> ${(data.visibility / 1000).toFixed(2)} km</p>
                </div>
            </div>
        </div>
    `;
}

// Dropdown toggle functionality
function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Populate the dropdown when the document is ready
document.addEventListener("DOMContentLoaded", populateDropdown);