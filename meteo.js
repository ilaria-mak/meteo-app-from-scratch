//STEP 3: Creo le variabili da associare agli id e agli elementi dell'API
function displayMeteoData(response) {
  let temperatureDisplayed = document.querySelector("#temperature"); //chiama l'id per modificarlo
  let descriptionDisplayed = document.querySelector("#description");
  let humidityDisplayed = document.querySelector("#humidity");
  let windSpeedDisplayed = document.querySelector("#wind-speed");
  let timeDisplayed = document.querySelector("#time");
  let date = new Date(response.data.time * 1000); //prende l'elemento 'time' dall'API associato alla data di oggi che è però espresso in millisecondi dal 1970 (moltiplico dunque per 1000)
  let iconDisplayed = document.querySelector("#icon");
  let perceivedTemperatureDisplayed = document.querySelector(
    "#perceived-temperature"
  );

  //ogni volta che creo una variabile, la associo al rispettivo elemento in HTML che viene fatto corrispondere alle info prese dall'API
  timeDisplayed.innerHTML = dateFormatted(date); //la variabile mi ritorna la data formattata (FINE STEP 6)
  temperatureDisplayed.innerHTML = Math.round(
    response.data.temperature.current
  ); //la variabile mi ritorna i valori dell'evento response già arrotondati
  descriptionDisplayed.innerHTML = response.data.condition.description; //la descrizione visualizzata verrà presa dall'API
  humidityDisplayed.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedDisplayed.innerHTML = `${response.data.wind.speed} km/h`;
  iconDisplayed.innerHTML = `<img src="${response.data.condition.icon_url}" />`; //Qui utilizzo il linguaggio html per inserire un'immagine che ha la sorgente nell'API
  perceivedTemperatureDisplayed.innerHTML = `feels like <strong>${Math.round(
    response.data.temperature.feels_like
  )}°C</strong>`;

  fetchForecast(response.data.city); //chiamo la funzione creata nello STEP 8
}

//STEP 6: Formatta la data
function dateFormatted(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; //siccome la funzione 'New Date' mi rimanda il gg sett sotto forma di numero da 0 a 6, creo un array di oggetti
  let dayOfTheWeek = date.getDay(); //ottiene il giorno della settimana
  let dayFormatted = weekdays[dayOfTheWeek]; //ottieni il nome del giorno della settimana

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dayFormatted} ${hours}:${minutes}`; //Restituisci il giorno della settimana seguito da ora e minuti
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

//STEP 4: chiamo la funzione inserendo una città di default in apertura della pagina con valori meteo reali
citySearch("Taranto");

//STEP 8: crea la funzione forecast che andremo a chiamare nella funzione displayMeteoData quando cerchiamo una città
function fetchForecast(city) {
  let apiKey = "b1943d50401398to8a0677ac9c9333f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`; // è diverso dal precedente
  axios(apiUrl).then(displayForecast); //axios prende i dati del forecast e poi chiama la funzione displayForecast
}

//STEP 9:
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000); //moltiplico per mille perché é in millisecondi
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

//STEP 7: injecta in JS il forecast attraverso un loop invece di sovrascrivere HTML
function displayForecast(response) {
  let forecastHtml = ""; //creo una variabile vuota
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      // modifico l'indice a seconda di quanti gg voglio visualizzare
      forecastHtml =
        forecastHtml +
        `<div class="meteo-forecast-day">
            <div class="meteo-forecast-weekday">${formatDay(day.time)}</div> 
            <div class="meteo-forecast-icon"><img src="${
              day.condition.icon_url
            }"></div>
            <div class="meteo-forecast-minmax">
              <div class="meteo-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°C</strong>
              </div>
              <div class="meteo-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
       </div>`; //in HTML avrei avuto questa struttura per ogni gg del forecast ma sarebbe overingegnerizzato, perciò la utilizzo per riempire la variabile vuota creata prima
    }
  });

  let forecastDisplayed = document.querySelector("#forecast"); //chiamo l'id in HTML per associarlo a JS
  forecastDisplayed.innerHTML = forecastHtml; //la nuova variabile è associata al risultato del loop (mi basterà aggiungere un gg all'array per visualizzare un altro elemento del forecast)
}

displayForecast(); //chiamo la funzione
