const apiKey = "1d0b51414e0624715947a5e47cb467a1";

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");
const dateTime = document.getElementById("dateTime");
const icon = document.querySelector(".icon");

const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

// Search Button
searchBtn.addEventListener("click", () => {
    const cityName = input.value.trim();

    if(cityName === ""){
        alert("Please enter a city name");
        return;
    }

    getWeather(cityName);
});

// Enter Key Support
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchBtn.click();
    }
});

// Current Location
locationBtn.addEventListener("click", () => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByLocation(lat,lon);

        });

    }else{
        alert("Location not supported");
    }

});

// Weather By City
async function getWeather(cityName){

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod != 200){
        alert("City not found!");
        return;
    }

    updateWeather(data);

}

// Weather By Location
async function getWeatherByLocation(lat,lon){

    const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    updateWeather(data);

}

// Update UI
function updateWeather(data){

    city.textContent = data.name;

    temp.textContent = Math.round(data.main.temp) + "°C";

    feels.textContent =
    "Feels Like " + Math.round(data.main.feels_like) + "°C";

    condition.textContent = data.weather[0].main;

    humidity.textContent = data.main.humidity + "%";

    wind.textContent = Math.round(data.wind.speed) + " km/h";

    const weather = data.weather[0].main;

    if(weather==="Clear"){
        icon.textContent="☀️";
    }
    else if(weather==="Clouds"){
        icon.textContent="☁️";
    }
    else if(weather==="Rain"){
        icon.textContent="🌧️";
    }
    else if(weather==="Thunderstorm"){
        icon.textContent="⛈️";
    }
    else if(weather==="Snow"){
        icon.textContent="❄️";
    }
    else{
        icon.textContent="🌤️";
    }

}

// Date
function updateDate(){

    const now = new Date();

    const options={
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    };

    dateTime.textContent =
    now.toLocaleDateString("en-IN",options);

}

updateDate();
