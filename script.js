let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let apiKey = "23d361c16cda8a10f140f972cd585469";
let units = "metric";

let celsiusTemperature = null;

function initialize() {
  setCurrentDate();
  initializeEvents();
}

function setCurrentDate() {
  let currentDate = new Date();
  let hoursElement = document.querySelector(".time");
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  hoursElement.innerHTML = `${day} ${month} ${date} ${year} ${formatHours()}`;
}

function initializeEvents() {
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheitLink);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsiusLink);
}

//time
function formatHours(timestamp){
  let currentDate = null;
  if (timestamp) {
    currentDate = new Date(timestamp);
  } else {
    currentDate = new Date();
  }
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
 }

//icons
function getIcon(icon) {
  if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
    return "fas fa-cloud";
  }
  if (icon === "01d") {
    return "fas fa-sun";
  } 
  if (icon === "01n") {
    return "fas fa-moon";
  } 
  if (icon === "02d") {
    return "fas fa-cloud-sun";
  } 
  if (icon === "02n") {
    return "fas fa-cloud-moon";
  } 
  if (icon === "09d" || icon === "09n") {
    return "fas fa-cloud-showers-heavy";
  } 
  if (icon === "10d" || icon === "10n") {
    return "fas fa-cloud-rain";
  } 
  if (icon === "13d" || icon === "13n") {
    return "far fa-snowflake";
  } 
  if (icon === "50d" || icon === "50n") {
    return "fas fa-stream";
  }
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
 
  //icon - main icon + forecast icons
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("class", getIcon(response.data.weather[0].icon));
  celsiusTemperature = Math.round(response.data.main.temp);
}

//search
function searchLocation(position) {
  getWeather(null, position.coords.latitude, position.coords.longitude);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//forecast 
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  for (let index = 0; index < 4; index++){
  let forecast = response.data.list[index];
    forecastElement.innerHTML +=
      `<div class="col-3">
        <div class="card-body">
          <h4 class="card-title"id="day-one">${formatHours(forecast.dt * 1000)}</h4>
          <h5 class="weather-icon">
          <i class="${getIcon(forecast.weather[0].icon)}"></i></h5>
          <p class="temp-day-one">${Math.round(forecast.main.temp_max)}°C</p>
        </div>
      </div>`;  
  }
}

//search engine
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-form");
  let city = document.querySelector("#city-input").value;
  cityElement.innerHTML = cityInput.value;
  getWeather(city, null, null);
}

function getWeather(city, latitude, longitude) {
  let baseUrl =  "https://api.openweathermap.org/data/2.5";
  let weatherUrl = baseUrl + `/weather?appid=${apiKey}&units=${units}`;
  let forecastUrl = baseUrl + `/forecast?appid=${apiKey}&units=${units}`;
  if (city) {
    weatherUrl += `&q=${city}`;
    forecastUrl += `&q=${city}`;
  }
  if (latitude) {
    weatherUrl += `&lat=${latitude}`;
    forecastUrl += `&lat=${latitude}`;
  }
  if (longitude) {
    weatherUrl += `&lon=${longitude}`;
    forecastUrl += `&lon=${longitude}`;
  }
  axios.get(weatherUrl).then(showWeather);
  axios.get(forecastUrl).then(displayForecast);
}

// celsius to fahrenheit conversion
function convertToFahrenheitLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
}

// celsius
function convertToCelsiusLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

initialize();