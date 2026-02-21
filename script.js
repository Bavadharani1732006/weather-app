const apiKey = "42c658cb1b73946820772d4a6b84c602";

/* ===== SEARCH WEATHER ===== */
async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            document.getElementById("result").innerHTML = "City not found ❌";
            return;
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        document.getElementById("result").innerHTML = "Error loading data ⚠️";
        console.log(error);
    }
}

/* ===== LOCATION WEATHER ===== */
function getLocationWeather() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(async function(position) {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                document.getElementById("result").innerHTML = "Location error ⚠️";
                return;
            }

            const data = await response.json();
            displayWeather(data);

        } catch (error) {
            document.getElementById("result").innerHTML = "Location error ⚠️";
            console.log(error);
        }

    }, function() {
        alert("Allow location permission");
    });
}

/* ===== DISPLAY FUNCTION ===== */
function displayWeather(data) {

    document.getElementById("result").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>🌤 Condition: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
}

/* ===== DARK MODE ===== */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}



