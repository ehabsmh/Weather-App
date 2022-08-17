var dayDate = document.querySelectorAll(".day-date");
var days = document.querySelectorAll(".days");
var countryName = document.getElementById("countryName");
var dayTemprature = document.querySelectorAll(".temprature");
var dayConditionImg = document.querySelectorAll(".weather-img");
var dayCondition = document.querySelectorAll(".condition");
var searchBar = document.getElementById("searchBar");

var country = "egypt";

async function getWeather(country) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=aed071f2c23f4b419ac151759221306&q=${country}&days=3&aqi=no&alerts=no%60`
  );
  var result = await response.json();
  console.log(result);
  displayWeather(result);
}

(async function () {
  await getWeather(country);
})();

function displayWeather(data) {
  var weather = data.forecast.forecastday;
  countryName.innerHTML = data.location.name;
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var d = new Date();

  var currentDayIndex = 0;
  for (var i = 0; i < weather.length; i++) {
    days[i].innerHTML = weekday[d.getDay() + currentDayIndex];
    dayDate[i].innerHTML = weather[i].date;
    dayTemprature[i].innerHTML = `${Math.round(weather[i].day.avgtemp_c)}°C`;
    dayConditionImg[i].src = weather[i].day.condition.icon;
    dayCondition[i].innerHTML = weather[i].day.condition.text;
    currentDayIndex++;
  }
}

searchBar.addEventListener("keyup", function () {
  country = searchBar.value;
  getWeather(country);
});
