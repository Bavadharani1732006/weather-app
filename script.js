const apiKey = "42c658cb1b73946820772d4a6b84c602";

function getWeather() {
    const city = document.getElementById("city").value;

    // Current Weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {

            if (data.cod == 200) {

                const icon = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                document.getElementById("result").innerHTML =
                    `Temperature: ${data.main.temp} °C <br>
                     Weather: ${data.weather[0].description} <br>
                     <img src="${iconUrl}">`;

                // 5 Day Forecast
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(forecastData => {

                        let forecastHTML = "<h3>5 Day Forecast:</h3>";

                        for (let i = 0; i < forecastData.list.length; i += 8) {

                            let day = forecastData.list[i];
                            const icon2 = day.weather[0].icon;
                            const iconUrl2 = `https://openweathermap.org/img/wn/${icon2}@2x.png`;

                            forecastHTML += `
                                <p>
                                ${day.dt_txt.split(" ")[0]} <br>
                                ${day.main.temp} °C <br>
                                <img src="${iconUrl2}">
                                </p>
                                <hr>
                            `;
                        }

                        document.getElementById("forecast").innerHTML = forecastHTML;
                    });

            } else {
                document.getElementById("result").innerHTML = "City not found!";
                document.getElementById("forecast").innerHTML = "";
            }

        });
}

function getLocationWeather() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {

                    const icon = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                    document.getElementById("result").innerHTML =
                        `Location: ${data.name} <br>
                         Temperature: ${data.main.temp} °C <br>
                         Weather: ${data.weather[0].description} <br>
                         <img src="${iconUrl}">`;

                    document.getElementById("forecast").innerHTML = "";
                });

        });

    } else {
        alert("Geolocation not supported");
    }
}
function toggleMode() {
    document.body.classList.toggle("dark");
}
