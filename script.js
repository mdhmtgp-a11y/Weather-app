const apiKey = "1d0b51414e0624715947a5e47cb467a1";

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.querySelector(".icon");

const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");

button.addEventListener("click", () => {
    const cityName = input.value.trim();

    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeather(cityName);
});

async function getWeather(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            alert("City not found!");
            return;
        }

        city.textContent = data.name;
        temp.textContent = Math.round(data.main.temp) + "°C";
        condition.textContent = data.weather[0].main;
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + " km/h";

        const weather = data.weather[0].main;

        if(weather=="Clouds") icon.textContent="☁️";
        else if(weather=="Rain") icon.textContent="🌧️";
        else if(weather=="Clear") icon.textContent="☀️";
        else if(weather=="Snow") icon.textContent="❄️";
        else if(weather=="Thunderstorm") icon.textContent="⛈️";
        else icon.textContent="🌤️";

    } catch (error) {
        alert("Something went wrong.");
    }
    }
