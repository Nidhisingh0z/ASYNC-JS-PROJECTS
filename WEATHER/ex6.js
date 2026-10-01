const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

const loading = document.querySelector("#loading");
const error = document.querySelector("#error");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weatherDescription");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");


searchBtn.addEventListener("click", () => {

    const city = cityInput.value;

    if (city === "") {
        error.innerText = "Please enter a city";
        return;
    }

    loading.style.display = "block";
    error.innerText = "";


    // Step 1: Get latitude and longitude
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
    
        .then((response) => response.json())

        .then((data) => {

            if (!data.results) {
                cityName.innerText = "City not found";
            }

            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;
            const name = data.results[0].name;

            // Step 2: Get weather
            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
            )
            .then((response) => response.json())
            .then((weatherData) => {

                const current = weatherData.current;

                cityName.innerText = name;
                temperature.innerText = current.temperature_2m;
                feelsLike.innerText = current.apparent_temperature + "°C";
                humidity.innerText = current.relative_humidity_2m + "%";
                wind.innerText = current.wind_speed_10m + " km/h";

                weatherDescription.innerText =
                    "Weather Code: " + current.weather_code;

                loading.style.display = "none";
            });

        })

        .catch((error) => {

            loading.style.display = "none";
            error.innerText = "City not found";

            console.log(error);

        });

});