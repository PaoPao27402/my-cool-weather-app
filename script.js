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

 //icon
 let iconElement = document.querySelector("#main-icon");
 if (
   response.data.weather[0].icon === "03d" ||
   response.data.weather[0].icon === "03n"
 ) {
   iconElement.setAttribute("class", "fas fa-cloud");
 } else if (response.data.weather[0].icon === "04d") {
   iconElement.setAttribute("class", "fas fa-cloud");
 } else if (response.data.weather[0].icon === "04n") {
   iconElement.setAttribute("class", "fas fa-cloud");
 } else if (response.data.weather[0].icon === "01d") {
   iconElement.setAttribute("class", "fas fa-sun");
 } else if (response.data.weather[0].icon === "01n") {
   iconElement.setAttribute("class", "fas fa-moon");
 } else if (response.data.weather[0].icon === "02d") {
   iconElement.setAttribute("class", "fas fa-cloud-sun");
 } else if (response.data.weather[0].icon === "02n") {
   iconElement.setAttribute("class", "fas fa-cloud-moon");
 } else if (response.data.weather[0].icon === "09d") {
   iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
 } else if (response.data.weather[0].icon === "09n") {
   iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
 } else if (response.data.weather[0].icon === "10d") {
   iconElement.setAttribute("class", "fas fa-cloud-rain");
 } else if (response.data.weather[0].icon === "10n") {
   iconElement.setAttribute("class", "fas fa-cloud-rain");
 } else if (response.data.weather[0].icon === "13d") {
   iconElement.setAttribute("class", "far fa-snowflake");
 } else if (response.data.weather[0].icon === "13n") {
   iconElement.setAttribute("class", "far fa-snowflake");
 } else if (response.data.weather[0].icon === "50d") {
   iconElement.setAttribute("class", "fas fa-stream");
 } else if (response.data.weather[0].icon === "50n") {
   iconElement.setAttribute("class", "fas fa-stream");
 }   
 celsiusTemperature = Math.round(response.data.main.temp);
}

function searchLocation(position) {
  let apiKey = "23d361c16cda8a10f140f972cd585469";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//forecast 
function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML=null;
let forecast = null;
console.log(forecast);

for (let index = 0; index < 4; index++){
let forecast = response.data.list[index];
forecastElement.innerHTML +=
 `<div class="col-3">
                
<div class="card-body" style="background-color: rgba(239, 248, 254, 0.08);">
<h4 class="card-title"id="day-one">Thu</h4>
  <h5 class="weather-icon">
  <i class="fas fa-cloud"></i></h5>
  <p class="temp-day-one">${Math.round(forecast.main.temp_max)}°C</p>
</div>
</div>`;  
  
 }

}



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
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsiusLink);
