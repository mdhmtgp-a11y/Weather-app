const apiKey = 2eb2ac0ed34ebf88016e545561ba61c8

const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

const cityName = document.querySelector(".weather-card h2");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const icon = document.querySelector(".weather-icon");

const humidityBox = document.querySelectorAll(".detail-box")[0];
const windBox = document.querySelectorAll(".detail-box")[1];

async function getWeather(city) {
  if (!city) return;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert(data.message || "City not found");
      return;
    }

    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C";
    condition.textContent = data.weather[0].description;

    humidityBox.textContent = "Humidity: " + data.main.humidity + "%";
    windBox.textContent = "Wind: " + data.wind.speed + " m/s";

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  } catch (err) {
    console.log(err);
    alert("Network error or API issue");
  }
}

// button click
searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value.trim());
});

// enter key support
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(searchInput.value.trim());
  }
});

// default city
getWeather("Delhi");
