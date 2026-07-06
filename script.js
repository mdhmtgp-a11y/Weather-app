const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");
const icon = document.querySelector(".icon");

button.addEventListener("click", () => {

    const cityName = input.value.trim();

    if(cityName === ""){
        alert("Please enter a city name.");
        return;
    }

    city.textContent = cityName;

    // Demo weather data
    temp.textContent = "29°C";
    condition.textContent = "Cloudy ☁️";
    humidity.textContent = "72%";
    wind.textContent = "14 km/h";
    icon.textContent = "☁️";

});
