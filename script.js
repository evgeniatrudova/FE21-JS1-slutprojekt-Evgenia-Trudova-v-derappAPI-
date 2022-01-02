//__DEL 1: Stockholm kod. API, som använder sig av openweathermap-metod för att skaffa position och temperatur.______________________________________________________________
/*  
 Linking data value to HTML elements with addEventListener and document.querySelector
 HTML class for search button has addEventListener activity, so clicking activates function to weather.search();
 addEventActivity is added to search-bar, listens to keyup events. Constant display of data for weather.fetchWeather("Stockholm").
 apikey declared to connect with API-library
 fetch-method,chooses data. fetchWeather is a function for API-city group that holds fetch-method.
 this.apiKey closes method, by connecting fetch to apiKey.
 Error message, by .then(response), function, if response is not ok then alert error message.
  return response json from API   
 When class provides data; request displayWeather for that position (city).   
 Declaration of data, needed  City, icon, description, temperature, humidity, windspeed
 Class displayWeather, opens function for (data)  that contains object-zone where parameters are deklared.
 const {JS-name} = data used in JS
 document.querySelector chooses (.HTML class).DOMaction = links to data used in JS  
 Input value in (.HTML class) search-bar is linked by this. to the data value within search function.*/
 
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

//___Del 2: OPENWEATHERMAP-Needs icons_____2 api calls shut each other off, example api________________________________________________________
//________________________________________________________________
  const CURRENT_LOCATION = document.getElementsByClassName('weather-content__overview')[0];
  const CURRENT_TEMP = document.getElementsByClassName('weather-content__temp')[0];
  const FORECAST = document.getElementsByClassName('component__forecast-box')[0];
  const appid = 'e43f64ee98be9268f7a7f49e34aecfdf'; 
     function getWeatherData(position) {
          const headers = new Headers();
          const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${position}&cnt=7&units=metric&lang=sv&APPID=${appid}`;
          return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data => data.json());
     }
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
 
  renderData = (location, forecast) => {
  // render city, current weather description and temp
  const currentWeather = forecast[0].weather[0];
  const widgetHeader = `<h1>${location.name}</h1><small>${currentWeather.description}</small>`;
  console.log(forecast[0].temp.day)
  CURRENT_TEMP.innerHTML = `<i class="wi ${applyIcon(currentWeather.icon)}"></i> ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees">&#176;c</i>`;
  CURRENT_LOCATION.innerHTML = widgetHeader;

// render each daily forecast
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
          if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
  	const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    // run/render the widget data
    getWeatherData(coordinates).then(weatherData => {
      const city = weatherData.city;
      const dailyForecast = weatherData.list;

      renderData(city, dailyForecast);
    });
  }, e => console.log(e));
} else {
	        console.log('unable to retrieve location from browser')
          };
//_____DEL 3: Helvete som inte blir översätt___________________________________________________________
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
