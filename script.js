const apiKey = "42c658cb1b73946820772d4a6b84c602";

// 🌍 Search by City
function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod != 200) {
                document.getElementById("result").innerHTML = "City not found ❌";
                return;
            }

            displayWeather(data);
        })
        .catch(error => {
            document.getElementById("result").innerHTML = "Error fetching data ❌";
        });
}

// 📍 Use My Location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                });

        });
    } else {
        alert("Geolocation not supported by this browser");
    }
}

// 🌤 Show Weather Data
function displayWeather(data) {

    const weatherHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("result").innerHTML = weatherHTML;
}

// 🌙 Dark Mode Toggle
function toggleMode() {
    document.body.classList.toggle("dark");
}


