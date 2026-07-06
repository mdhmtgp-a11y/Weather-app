const API_KEY = "2eb2ac0ed34ebf88016e545561ba61c8";

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherIcon = document.getElementById("weatherIcon");
const dateTime = document.getElementById("dateTime");

function formatTime(unix) {
    return new Date(unix * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function updateDateTime() {
    dateTime.textContent = new Date().toLocaleString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

async function updateUI(data) {
    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C";
    condition.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels Like ${Math.round(data.main.feels_like)}°C`;

    humidity.textContent = data.main.humidity + "%";
    wind.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";
    pressure.textContent = data.main.pressure + " hPa";
    visibility.textContent = (data.visibility / 1000).toFixed(1) + " km";

    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

async function getWeather(cityName) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        if (data.cod != 200) {
            alert("City not found!");
            return;
        }

        updateUI(data);

    } catch (err) {
        console.error(err);
        alert("Failed to fetch weather.");
    }
}

searchBtn.addEventListener(...)

locationBtn.addEventListener(...)

getWeather("Delhi");

searchBtn.onclick = () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
        getForecast(cityName);
    }
};

cityInput.onkeydown = (e) => {
    if (e.key === "Enter") {
        const cityName = cityInput.value.trim();
        if (cityName) {
            getWeather(cityName);
            getForecast(cityName);
        }
    }
};

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const { latitude, longitude } = position.coords;

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        updateUI(data);

    }, () => {
        alert("Location permission denied.");
    });

});

// Default city
getWeather("Delhi");
async function getForecast(cityName) {

    try {

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        const forecastCards = document.getElementById("forecastCards");
        forecastCards.innerHTML = "";

        const dailyData = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        dailyData.forEach(day => {

            const date = new Date(day.dt_txt);

            const card = document.createElement("div");
            card.className = "forecast-card";

            card.innerHTML = `
                <h4>${date.toLocaleDateString("en-US",{weekday:"short"})}</h4>

                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

                <p>${Math.round(day.main.temp)}°C</p>

                <small>${day.weather[0].main}</small>
            `;

            forecastCards.appendChild(card);

        });

    } catch (err) {
        console.log(err);
    }

}

// Search button
searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value.trim();

    if(cityName){

        getWeather(cityName);
        getForecast(cityName);

    }

});

// Enter key
cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        const cityName = cityInput.value.trim();

        if(cityName){

            getWeather(cityName);
            getForecast(cityName);

        }

    }

});

// Default city
getForecast("Delhi");
