function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form-input");
  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = cityInput.value;
  let apiKey = "b1943d50401398to8a0677ac9c9333f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
document.getElementById("search-form").addEventListener("submit", citySearch);
