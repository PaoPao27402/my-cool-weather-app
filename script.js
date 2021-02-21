let myHoras = new Date();
console.log(myHoras.getDate());

let horas = document.querySelector(".time");

let date = myHoras.getDate();
let hour = myHoras.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = myHoras.getMinutes();
if (hour < 10) {
  hour = `0${minutes}`;
}
let year = myHoras.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[myHoras.getDay()];
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
let month = months[myHoras.getMonth()];
horas.innerHTML = `${day} ${month} ${date} ${year} ${hour}:${minutes}`;

//time
function formatHours(timestamp){
  let myHoras = new Date(timestamp);
   console.log(myHoras.getDate());
   let hour = myHoras.getHours();
   if (hour < 10) {
     hour = `0${hour}`;
   }
   let minutes = myHoras.getMinutes();
   if (hour < 10) {
   hour = `0${minutes}`;
   }
   return `${hour}:${minutes}`;
 }

 //icons
function getIcon(icon) {
  let iconElement = "";
  if (icon === "03d" || icon === "03n") {
    iconElement = "fas fa-cloud";
  } else if (icon === "04d") {
    iconElement = "fas fa-cloud";
  } else if (icon === "04n") {
    iconElement = "fas fa-cloud";
  } else if (icon === "01d") {
    iconElement = "fas fa-sun";
  } else if (icon === "01n") {
    iconElement = "fas fa-moon";
  } else if (icon === "02d") {
    iconElement = "fas fa-cloud-sun";
  } else if (icon === "02n") {
    iconElement = "fas fa-cloud-moon";
  } else if (icon === "09d") {
    iconElement = "fas fa-cloud-showers-heavy";
  } else if (icon === "09n") {
    iconElement = "fas fa-cloud-showers-heavy";
  } else if (icon === "10d") {
    iconElement = "fas fa-cloud-rain";
  } else if (icon === "10n") {
    iconElement = "fas fa-cloud-rain";
  } else if (icon === "13d") {
    iconElement = "far fa-snowflake";
  } else if (icon === "13n") {
    iconElement = "far fa-snowflake";
  } else if (icon === "50d") {
    iconElement = "fas fa-stream";
  } else if (icon === "50n") {
    iconElement = "fas fa-stream";
  }
  return iconElement;
}

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

 //icon - main icon + forecast icons
 let iconElement = document.querySelector("#main-icon");
 iconElement.setAttribute("class", getIcon(response.data.weather[0].icon));

 celsiusTemperature = Math.round(response.data.main.temp);
}

//search
function searchLocation(position) {
  let apiKey = "23d361c16cda8a10f140f972cd585469";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//forecast 
function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML=null;
let forecast = null;
console.log(forecast);

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
  cityElement.innerHTML = cityInput.value;
  let apiKey = "23d361c16cda8a10f140f972cd585469";
  let units = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// celsius to fahrenheit conversion
function convertToFahrenheitLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitLink);

// celsius
function convertToCelsiusLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  navigator.geolocation.getCurrentLocation("search-form")
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsiusLink);
