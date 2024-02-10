//STEP 3:
function displayMeteoData(response) {
  let temperatureDisplayed = document.querySelector("#temperature"); //chiama l'id per modificarlo
  temperatureDisplayed.innerHTML = Math.round(
    response.data.temperature.current
  ); //la variabile mi ritorna i valori dell'evento response già arrotondati
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
