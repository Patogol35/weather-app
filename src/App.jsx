import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    try {
      // Datos actuales
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      setWeather(current.data);

      // Pronóstico 5 días / cada 3 horas
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      // Filtrar solo un pronóstico al día (12:00)
      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);
      setError("");
    } catch (err) {
      setError("Ciudad no encontrada ❌");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Consulta el Clima</h1>
      <p className="subtitle">
        Desarrollado por Jorge Patricio Santamaría Cherrez
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Ingresa una ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}

      {forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((item, index) => (
            <ForecastCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
