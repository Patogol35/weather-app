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

      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

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
