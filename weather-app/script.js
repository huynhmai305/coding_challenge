const apikey = "69c014ad4c1da2fe441a61230035b371";
const API_LOCATION = "https://ipinfo.io?token=d1b7d18cbb9812";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const API_WEATHER = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&lang=vi`;
const IMG_WEATHER = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const getWeatherByLocation = async (location) => {
  const api = await fetch(API_WEATHER(location), { origin: "cors" });
  const res = await api.json();

  if (res) {
    console.log(res);
    addWeatherToPage(res);
  }
};

const getLocation = async () => {
  const res = await fetch(API_LOCATION);
  const data = await res.json();
  getWeatherByLocation(data.city);
};

// Kelvin to Celsius
const KToC = (K) => {
  return Math.floor(K - 273.15);
};

const addWeatherToPage = (data) => {
  // clear container
  main.innerHTML = "";

  const temp = KToC(data?.main?.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2>
      <img src=${IMG_WEATHER(data.weather[0].icon)} />
      ${temp}°C
      <img src=${IMG_WEATHER(data.weather[0].icon)} />
    </h2>
    <p>${data.name}</p>
    <small>${data.weather[0].description}</small>
  `;

  main.appendChild(weather);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  if (location) {
    getWeatherByLocation(location);
  }
});

getLocation();
