//__DEL 1: API,som använder sig av  OPENWEATHERMAP & key -metod för att skaffa position och temperatur.______________________________________________________________
/*  
 1)    Variabler deklareras inför en funktion weather.
 2)    ApiKey är en sträng som innehåller API-nyckel, och fetchWeather() är en funktion som tar en parameter: city.
 3)    Koden anropar Open Weather Map API för att få väderdata för given (city) stad.
 4)    När man inte få svar från city; svar att en varning visas med texten "No weather found."
 5)    Retur JSON-data bibliotek selekteras för data för temperatur och luftfuktighet.
 6)    Data visas med documentQuery.
 7)    Kontroll; vid ingen sökning visas information för Stockholm. 
 */
 
let weather = {
      apiKey: "aea8811ce08d9fa322399c6d41422c47",
      fetchWeather: function (city) {  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+ "&lang=sv&units=metric&appid="+ this.apiKey)                                    
      .then((response) => {if (!response.ok) {alert("No weather found."); throw new Error("No weather found.");
      }                  
      return response.json();
      })                                      
     .then((data) => this.displayWeather(data));
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Fuktighet: " + humidity + "%";
    document.querySelector(".wind").innerText =   "Vind hastighet: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },  

  search: function () { this.fetchWeather(document.querySelector(".search-bar").value); },
};
   document.querySelector(".search button").addEventListener("click", function () {
   weather.search();
});
   document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  weather.fetchWeather("Stockholm");

//___Del 2: OPENWEATHERMAP som använder dator location och visar current väder samt väder 1 vecka fram med hjälp av en nytt key ________________________________________________________
/*  
 1)   Funktion getWeatherData (position) hämtar data för given position. 
 2)   Headers= newHeaders; HTTP-rubrik skapas för sökning i databas.
 3)   Url skapas för API sökning; istället för att hämta alla data, hämtas sendast HTTP-länkad urval av data.
 4)   Fetch förflyttar data som JSON, från API sökning till OpenWeatherMap och tillbaka till funktion. 
 5)    > 1.  this. Få tag i klass weather-content__overview. Hela innehåll i weather-content. 
 6)    > 2.  if.  kapslar in temperatur data.
 7)    > 3.  Box hämtas, som forecastbox.
 8)   ICON.    Icon funktion använder förbyggd kod för att switch ska kunna byta icon, när den bollar mot värde i väder funtion. Icon position därefter placeras i box, forecast; över temperatur värde; och <script> för kod lyckas inte hämta in icon img från cdnjs. Länk är sannolikt äldre; metod beskrivs i tutorial från 2017. Kod sekvens plockas inte bort, för att getWeatherData kod söker efter icon; när kod raderas, data för väder och veckan framåt visas inte i boxar. Nytt cdnjs länk, hämtar inte in icon img.   
 9)   RENDERDATA  Render data definerar variabel; position.
 10)  Kapsel ordning av data från openweathermap för en vecka fram i tiden   [array of objects  [forecast data[parameter] 
 11)  Första objekt; innehåller description, icon, temperatur, position. 
 12)  <div> visar innehåll i objekt.
 13)  GEOLOCATION  Koden kontrollerar om webbläsaren har en geolokalisering.
 14)  Om kod få en geolocation, den lagras i koordinater av dailyForecast, skickar förfråga till API och få väderdata för närmaste avläsning position i API bibliotek. 
 15)  Om kod inte få geolocation, console log svar: Unable to retrieve location from browser.
 16)  I övrigt, boxar syns inte.
 */
//________________________________________________________________
     const CURRENT_LOCATION = document.getElementsByClassName('weather-content__overview')[0];
     const CURRENT_TEMP = document.getElementsByClassName('weather-content__temp')[0];
     const FORECAST = document.getElementsByClassName('component__forecast-box')[0];
     const appid = 'e43f64ee98be9268f7a7f49e34aecfdf'; 
     // GetWeatherData del
     function getWeatherData(position) {
          const headers = new Headers();
          const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${position}&cnt=7&units=metric&lang=sv&APPID=${appid}`;
          return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data => data.json());
     }
     //
     // Icon del
     function applyIcon(icon) {
     let selectedIcon;
     switch (icon) {
      case '01d':
      selectedIcon = "wi-day-sunny"
      break;
      case '01n':
      selectedIcon = "wi-night-clear"
      break;
      case '02d':
      case '02n':
      selectedIcon = "wi-cloudy"
      break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
      selectedIcon = "wi-night-cloudy"
      break;
      case '09d':
      case '09n':
      selectedIcon = "wi-showers"
      break;
      case '10d':
      case '10n':
      selectedIcon = "wi-rain"
      break;
      case '11d':
      case '11n':
      selectedIcon = "wi-thunderstorm"
      break;
      case '13d':
      case '13n':
      selectedIcon = "wi-snow"
      break;
      case '50d':
      case '50n':
      selectedIcon = "wi-fog"
      break;
      default:
      selectedIcon = "wi-meteor"
     }
     return selectedIcon;
     }
   //  
   // Render data- del, start. 
    renderData = (location, forecast) => {
 
       const currentWeather = forecast[0].weather[0];
       const widgetHeader = `<h1>${location.name}</h1><small>${currentWeather.description}</small>`;
       console.log(forecast[0].temp.day)
       CURRENT_TEMP.innerHTML = `<i class="wi ${applyIcon(currentWeather.icon)}"></i> ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees">&#176;c</i>`;
       CURRENT_LOCATION.innerHTML = widgetHeader;
       forecast.forEach(day => {
    let date = new Date(day.dt * 1000);
    let days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");
    console.log(day)
    dayBlock.className = 'forecast__item';
    dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
      <div class="forecast-item__info"><i class="wi ${applyIcon(day.weather[0].icon)}"</i> <span class="degrees">${Math.round(day.temp.day)}<i class="wi wi-degrees">&#176;c</i></span></div>`;
    FORECAST.appendChild(dayBlock);
  });
    }
   
   // 
   // Geolocation - start. 
          if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
  	const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    getWeatherData(coordinates).then(weatherData => {
      const city = weatherData.city;
      const dailyForecast = weatherData.list;

      renderData(city, dailyForecast);
    });
          }, e => console.log(e));
          } else {
	        console.log('Unable to retrieve location from browser')
          };
  //

//_____DEL 3: Kod exempel med Bootstrap utan key med API: metadata, som bara finns på 8 språk; ej på svenska; och innehåller begränsad antal väder punkt referenser och funkar bäst med välkända städer som t.ex London/ Stockholm men kommer inte att ge svar för Lund eller Malmö för att Sverige har endast 2 data punkter; för Stockholm och Göteborg___________________________________________________________
/*  
 1) Väder app konstrueras med en konstruktur-metod. Kod delas upp i klasser; funktion av en klass kapslas in i konstruktor grupp som beskriver vad funtkionen gör.     
 2) Konstruktorfunktion söker efter data, när kod aktiveras.
      > Innehåller variabler; baseApiUrl och searchApiUrl som används för att markera sökning; så att korrekt data hämtas från API.
      > addCorsHeader() en metod markering som underlättar sökning i API, igenom cross-domain blockeringar.
      >  $.ajaxPrefilter() metod kontrollerar att Cors fungerar; syfte är att ha en bra header som markerar sökning i API.
 3)  Kod är organiserad i 3  område; denna struktur är vanlig när man arbetar med framework och utökar Java Script.
     constructor() {  this.grupp = $('id-av-grupp-från-html');}  
    1.- Core DOM Elements - Det som visas på skärm
    2.- Search Form - Sökning funktion
    3.- Error Box - fel meddelande funktion        
 4)  Class Display Forecast, innehåller  url för en bild för Forecast; samt grupp showTodaysForecastDetails() med parametrar  name, value, unit; som få instruktioner att när parameter data ändras; då ska DOM element ändras efter struktur: 
            $(`id från html`).append(`
            <div class="position inne i HTML">
                <span class="position inne i HTML">${name}</span>
                <span>${value} ${unit}</span>
            </div>
 5)   showUpcomingDaysForecast innehåller parametrar (dayImgUrl, weekDay, maxTemp) och organiseras på snärlik sätt med ${parameternamn}.
       $('#id').append(`
               <li class="html">
                <img class="html" src="${this.imageURL}/${dayImgUrl}.svg" />
                <span class="html">${weekDay}</span>
                <span class="html">${maxTemp}</span>
               </li>
 6)    Inkapslade funktioner anropas med showTodaysForecast för forecast genom id och nya JS namn.
        showTodaysForecast(forecast) {
        $('#id').html(java script namn för grupp);
        $('#forecast-card-img').attr('src', `${this.imageURL}/${forecast.todaysImgUrl}.svg`);
        }}
        
 7)    dataMiddleware är en klass som innehåller en konstruktor, som använder this. för att skapa  två objekt.
               this.displayForecast = new displayForecast();
               this.coreDomElements = new coreDomElements();
       
 8)     gatherTodaysForecastDetails(data) använder return, för att plocka ut data man önskar få ut från API, t.ex temperatur och luftfuktighet.Istället för att få ut all data; man organiserar sökning som 
         return {
            önskvärtsökning: {
                value: data.namnpåönskvärtsökning,
                unit: 'övriga tecken som %',
            },
 9)   gatherTodaysForecastGeneral(data) använder return metod för att plocka ut (data):  
            currentWeekday: moment (data.applicable_date).format('dddd'),
            todaysFullDate: moment(data.applicable_date).format('MMMM Do'),
            locationName: data.title,
            todaysImgUrl: data.weather_state_abbr,
            todaysTemp: Math.round(data.the_temp),
            weatherState: data.weather_state_name,
 10)    Koden förbereder sedan data som kommer att användas för att visa dagens prognosdetaljer och morgondagens prognosdetalje genom att deklarera grupper som kan plockas ut med const; this. och data.Koden är avsedd att visa prognosen för idag och imorgon.
   
        prepareDataForDom(data) {
        const {  } = data.consolidated_weather[0]; organiserar alla möjliga data punkter man kan plocka från API
        const todaysForecastGeneral = this.gatherTodaysForecastGeneral({  }); = relevanta parametrar för design av app.
        const todaysForecastDetails = this.gatherTodaysForecastDetails({ }); = detaljer av todayforecast     
        prepareUpcomingDaysForecast(forecast) {
        $.each(forecast, (index, value) => {
            if (index < 1) return;
 11)    class requestController har construktor som använder this. för fetchForecastApi, coreDomeElements,coreDomElements,dataMiddleware, samt registrerEventListener som lyssnar till events. 
 12)     Om fetchWeather (query) använder sökning this inom fetchForecastApi return data och getLocation ger ingen svar; då få man fel meddelande  Could not find this location, please try again.
 
            fetchWeather(query) {  this.fetchForecastApi.getLocation(query, location => {
            if (!location || location.length === 0) {
                this.coreDomElements.showError('Could not find this location, please try again.');
                return;
 13)   Om data inte kan nåss, fel meddelande "Could not proceed with the request, please try again later"
 14)   Varje request, aktiveras när man trycker på Submit knapp; och sökning i API görs på nytt för showRequestInProgress och fetchWeather.
 15)   Data registreras.
 */
//________________________________________________________________
   class fetchForecastApi {
    constructor() { 
       this.baseApiUrl = 'https://www.metaweather.com/api/location/';
        this.searchApiUrl = `${this.baseApiUrl}/search`;
        this.addCorsHeader();
    }

    addCorsHeader() {
        $.ajaxPrefilter(options => {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' + options.url;
            }
        });
    }

    getLocation(query, callback) {
        $.getJSON(this.searchApiUrl, { query })
            .done(data => callback(data))
            .fail(() => callback(null));
    }

    getWeatherData(location, callback) {
        $.getJSON(`${this.baseApiUrl}/${location}`)
            .done(data => callback(data))
            .fail(() => callback(null));
    }
}
   class coreDomElements {
    constructor() {
        this.searchForm = $('#search-form');
        this.errorBox = $('#error-box');
        this.searchBox = $('#search-box');
        this.loaderBox = $('#loader-box');
        this.forecastBox = $('#forecast-box');
    }

    showForecast() {
        this.hideError();
        this.forecastBox.removeClass('d-none');
        this.forecastBox.addClass('d-flex');
    }

    showLoader() {
        this.loaderBox.removeClass('d-none');
    }

    hideLoader() {
        this.loaderBox.addClass('d-none');
    }

    showSearch() {
        this.searchBox.removeClass('d-none');
        this.searchBox.addClass('d-flex');
    }

    hideSearchBox() {
        this.searchBox.removeClass('d-flex');
        this.searchBox.addClass('d-none');
    }

    showError(message) {
        this.hideLoader();
        this.showSearch();
        this.errorBox.removeClass('d-none');
        this.errorBox.addClass('d-block');
        this.errorBox.html(`<p class="mb-0">${message}</p>`);
    }

    hideError() {
        this.errorBox.addClass('d-none');
    }
}
   class displayForecast {
    constructor() {
        this.imageURL = 'https://www.metaweather.com/static/img/weather';
    }
    showTodaysForecastDetails({ name, value, unit }) {
        $(`#forecast-details`).append(`
            <div class="d-flex justify-content-between">
                <span class="font-weight-bolder">${name}</span>
                <span>${value} ${unit}</span>
            </div>
        `);
    }
    showUpcomingDaysForecast({ dayImgUrl, weekDay, maxTemp }) {
        $('#forecast-details-week').append(`
            <li class="forecastBox__week-day d-flex flex-column justify-content-center align-items-center p-2 weather-day">
                <img class="mb-2" width="30" src="${this.imageURL}/${dayImgUrl}.svg" />
                <span class="mb-2">${weekDay}</span>
                <span class="font-weight-bold">${maxTemp}&deg</span>
            </li>
        `);
    }
    showTodaysForecast(forecast) {
        $('#forecast-card-weekday').html(forecast.currentWeekday);
        $('#forecast-card-date').html(forecast.todaysFullDate);
        $('#forecast-card-location').html(forecast.locationName);
        $('#forecast-card-img').attr('src', `${this.imageURL}/${forecast.todaysImgUrl}.svg`);
        $('#forecast-card-temp').html(forecast.todaysTemp);
        $('#forecast-card-description').html(forecast.weatherState);
    }
}
   class dataMiddleware {
    constructor() {
        this.displayForecast = new displayForecast();
        this.coreDomElements = new coreDomElements();
    }
    gatherTodaysForecastDetails(data) {
        return {
            humidity: {
                value: data.humidity,
                unit: '%',
            },
            wind: {
                value: Math.round(data.wind_speed),
                unit: 'km/h',
            },
            'air pressure': {
                value: data.air_pressure,
                unit: 'mb',
            },
            'max temp': {
                value: Math.round(data.max_temp),
                unit: '°C',
            },
        };
    }

    gatherTodaysForecastGeneral(data) {
        return {
            currentWeekday: moment(data.applicable_date).format('dddd'),
            todaysFullDate: moment(data.applicable_date).format('MMMM Do'),
            locationName: data.title,
            todaysImgUrl: data.weather_state_abbr,
            todaysTemp: Math.round(data.the_temp),
            weatherState: data.weather_state_name,
        };
    }

    prepareDataForDom(data) {
        const {
            predictability,
            humidity,
            wind_speed,
            air_pressure,
            max_temp,
            min_temp,
            applicable_date,
            the_temp,
            weather_state_abbr,
            weather_state_name,
        } = data.consolidated_weather[0];

        const todaysForecastGeneral = this.gatherTodaysForecastGeneral({
            applicable_date,
            weather_state_abbr,
            weather_state_name,
            the_temp,
            title: data.title,
        });
        const todaysForecastDetails = this.gatherTodaysForecastDetails({
            predictability,
            humidity,
            wind_speed,
            air_pressure,
            max_temp,
            min_temp,
        });

        this.displayForecast.showTodaysForecast(todaysForecastGeneral);
        this.prepareTodaysForecastDetails(todaysForecastDetails);
        this.prepareUpcomingDaysForecast(data.consolidated_weather);
        this.coreDomElements.hideLoader();
        this.coreDomElements.showForecast();
    }

    prepareTodaysForecastDetails(forecast) {
        $.each(forecast, (key, value) => {
            this.displayForecast.showTodaysForecastDetails({
                name: key.toUpperCase(),
                value: value.value,
                unit: value.unit,
            });
        });
    }

    prepareUpcomingDaysForecast(forecast) {
        $.each(forecast, (index, value) => {
            if (index < 1) return;

            const dayImgUrl = value.weather_state_abbr;
            const maxTemp = Math.round(value.max_temp);
            const weekDay = moment(value.applicable_date).format('dddd').substring(0, 3);

            this.displayForecast.showUpcomingDaysForecast({ dayImgUrl, maxTemp, weekDay });
        });
    }
}
   class requestController {
    constructor() {
        this.fetchForecastApi = new fetchForecastApi();
        this.coreDomElements = new coreDomElements();
        this.dataMiddleware = new dataMiddleware();
        this.registerEventListener();
    }

    showRequestInProgress() {
        this.coreDomElements.showLoader();
        this.coreDomElements.hideSearchBox();
    }

    getQuery() {
        return $('#search-query').val().trim();
    }

    fetchWeather(query) {
        this.fetchForecastApi.getLocation(query, location => {
            if (!location || location.length === 0) {
                this.coreDomElements.showError('Could not find this location, please try again.');
                return;
            }

            this.fetchForecastApi.getWeatherData(location[0].woeid, data => {
                if (!data) {
                    this.coreDomElements.showError('Could not proceed with the request, please try again later.');
                    return;
                }

                this.dataMiddleware.prepareDataForDom(data);
            });
        });
    }

    onSubmit() {
        const query = this.getQuery();
        if (!query) return;

        this.showRequestInProgress();
        this.fetchWeather(query);
    }

    registerEventListener() {
        this.coreDomElements.searchForm.on('submit', e => {
            e.preventDefault();
            this.onSubmit();
        });
    }
}
   const request = new requestController();
