import { getFlagUrl, getWeatherData } from "./api.js";
import cities from "./constant.js";
import {
  populateCityList,
  renderWeatherCard,
  renderError,
  renderLoader,
  uiElements,
  updateThemeIcon,
} from "./ui.js";

const body = document.body;
const theme = localStorage.getItem("data-theme") || "light";

body.setAttribute("data-theme", theme);

document.addEventListener("DOMContentLoaded", () => {
  populateCityList(cities);
});

uiElements.searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityName = e.target[0].value.trim();

  if (!cityName) {
    alert("Şehir ismi girilmesi zorunludur. Lütfen bir şehir adı giriniz.");
    return;
  }

  renderLoader();

  try {
    const weatherData = await getWeatherData(cityName);
    const flag = getFlagUrl(weatherData.sys.country);

    renderWeatherCard(weatherData, flag);
  } catch (error) {
    renderError();
  } finally {
    renderLoader();
  }
});

uiElements.themeButton.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);

  localStorage.setItem("data-theme", newTheme);
  updateThemeIcon(newTheme);
});
