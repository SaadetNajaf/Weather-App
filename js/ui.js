const uiElements = {
  searchForm: document.querySelector("form"),
  weatherContainer: document.querySelector(".weather-container"),
  errorMessage: document.querySelector("#error-message"),
  loader: document.querySelector("#loader"),
  cityList: document.querySelector("#city-list"),
  themeButton: document.querySelector("#theme-btn"),
};

const renderWeatherCard = (data, flagUrl) => {
  const date = new Date().toLocaleDateString("tr", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  uiElements.weatherContainer.innerHTML = "";
  uiElements.weatherContainer.classList.add("active");

  const card = ` <div class="weather-card">
          <div class="weather-header">
            <div class="location-info">
              <h2 id="location">${data.name}, ${data.sys.country}</h2>
              <div class="country-flag">
                <img src="${flagUrl}" alt="${data.name}" />
              </div>
            </div>
            <p id="date">${date}</p>
          </div>

          <div class="weather-info">

            <div class="temperature">
              <h3 id="temperature">${Math.round(data.main.temp)}°C</h3>
              <p>Hissedilen <span id="feel-like"> ${Math.round(
                data.main.feels_like
              )}°C</span></p>
            </div>

           
            <div class="weather-icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  data.weather[0].icon
                }@2x.png"
                alt="weather-icon"
              />

              <p id="weather-description">${data.weather[0].description}</p>
            </div>
          </div>

          
          <div class="weather-details">
          
            <div class="details">
              <i class="fa-solid fa-wind"></i>
              <div>
                <p>Rüzgar Hızı</p>
                <p id="wind-speed">${data.wind.speed} m/s</p>
              </div>
            </div>
            
            <div class="details">
              <i class="fa-solid fa-droplet"></i>
              <div>
                <p>Nem</p>
                <p id="humidity">${data.main.humidity}  %</p>
              </div>
            </div>

            <div class="details">
              <i class="fa-solid fa-minimize"></i>
              <div>
                <p>Basınç</p>
                <p id="pressure">${data.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>`;

  uiElements.weatherContainer.innerHTML = card;
  uiElements.errorMessage.classList.remove("show");
};

const renderError = () => {
  uiElements.errorMessage.classList.add("show");
  uiElements.weatherContainer.classList.remove("active");
};

const renderLoader = () => {
  uiElements.loader.classList.toggle("show");
};

const populateCityList = (cities) => {
  uiElements.cityList.innerHTML = cities
    .map((city) => `<option value="${city}"></option>`)
    .join("");
};

const updateThemeIcon = (theme) => {
  const themeIcon = uiElements.themeButton.querySelector("i");
  themeIcon.className =
    theme == "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
};

export {
  uiElements,
  renderWeatherCard,
  renderError,
  renderLoader,
  populateCityList,
  updateThemeIcon,
};
