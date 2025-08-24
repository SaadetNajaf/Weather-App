import { uiElements } from "./ui.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "ed9e7d54b33346174fe6c71e47ec17a2";

const getWeatherData = async (city) => {
  const res = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
  );
  const weatherData = await res.json();
  if (!res.ok) {
    throw new Error("Aranan şəhər tapılmadı ❌");
  }

  return weatherData;
};

const getFlagUrl = (countryCode) =>
  `https://flagcdn.com/108x81/${countryCode.toLowerCase()}.png`;

export { getWeatherData, getFlagUrl };
