//STEP 3: Creo le variabili da associare agli id e agli elementi dell'API
function displayMeteoData(response) {
  let temperatureDisplayed = document.querySelector("#temperature"); //chiama l'id per modificarlo
  let descriptionDisplayed = document.querySelector("#description");
  let humidityDisplayed = document.querySelector("#humidity");
  let windSpeedDisplayed = document.querySelector("#wind-speed");

  //ogni volta che creo una variabile, la associo al rispettivo elemento in HTML che viene fatto corrispondere alle info prese dall'API
  temperatureDisplayed.innerHTML = Math.round(
    response.data.temperature.current
  ); //la variabile mi ritorna i valori dell'evento response già arrotondati
  descriptionDisplayed.innerHTML = response.data.condition.description; //la descrizione visualizzata verrà presa dall'API
  humidityDisplayed.innerHTML = `${response.data.temperature.humidity}%`; //
  windSpeedDisplayed.innerHTML = `${response.data.wind.speed} km/h`;
}

//STEP 2: chiama l'API
function citySearch(city) {
  let apiKey = "b1943d50401398to8a0677ac9c9333f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayMeteoData); //chiama axios e poi rimanda i dati della funzione displayMeteoData
}

//STEP 1: crea il search engine
function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form-input"); //chiama i valori negli id
  let cityDisplayed = document.querySelector("#city"); //chiama i valori negli id
  cityDisplayed.innerHTML = cityInput.value; //modifica il testo in HTML
  citySearch(cityInput.value); //comunica con la funzione citySearch la citta di input
}

document.getElementById("search-form").addEventListener("submit", handleSearch); //aggiunge l'evento handleSearch al form quando clicco 'submit'

//STEP 4: inserisco una città di default in apertura della pagina con valori meteo reali
citySearch("Taranto");
