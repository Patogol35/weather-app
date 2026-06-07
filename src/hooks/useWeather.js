import { useState } from "react";
import { api } from "../api";

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");

    try {
      const [current, forecastRes] = await Promise.all([
        api.get("/weather", { params: { q: city } }),
        api.get("/forecast", { params: { q: city } }),
      ]);

      const grouped = {};

forecastRes.data.list.forEach((item) => {
  const day = item.dt_txt.split(" ")[0];

  if (!grouped[day]) {
    grouped[day] = {
      dt_txt: item.dt_txt,
      weather: item.weather,
      min: item.main.temp,
      max: item.main.temp,
    };
  }

  grouped[day].min = Math.min(grouped[day].min, item.main.temp);
  grouped[day].max = Math.max(grouped[day].max, item.main.temp);
});

const dailyForecast = Object.values(grouped);

      setWeather(current.data);
      setForecast(dailyForecast);
    } catch {
      setError("Ciudad no encontrada ❌");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
}
