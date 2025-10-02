// src/pages/Home.jsx
import { useState } from "react";
import WeatherCard from "../components/WeatherCard"; // 👈 asegúrate que este archivo exista
import "../App.css"; // 👈 importa tu CSS global

function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleSearch = async () => {
    if (!city) return;
    try {
      setError("");
      setWeather(null);
      setForecast([]);

      // 🔹 API Key de OpenWeather
      const API_KEY = "TU_API_KEY"; // 👈 pon tu API aquí

      // 🔹 Clima actual
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Ciudad no encontrada");
      const data = await res.json();
      setWeather(data);

      // 🔹 Pronóstico 5 días
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${API_KEY}`
      );
      const forecastData = await resForecast.json();
      setForecast(forecastData.list.filter((_, i) => i % 8 === 0)); // 1 por día
    } catch (err) {
      setError("No se pudo obtener el clima.");
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <p className="subtitle">Busca el clima de tu ciudad</p>

      {/* 🔹 Buscador */}
      <div className="search">
        <input
          type="text"
          placeholder="Ej: Quito"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* 🔹 Error */}
      {error && <p className="error">{error}</p>}

      {/* 🔹 Tarjeta principal del clima */}
      {weather && (
        <WeatherCard
          city={weather.name}
          temp={Math.round(weather.main.temp)}
          desc={weather.weather[0].description}
          icon={weather.weather[0].icon}
          humidity={weather.main.humidity}
          wind={weather.wind.speed}
        />
      )}

      {/* 🔹 Pronóstico semanal */}
      {forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <WeatherCard
              key={index}
              day={new Date(day.dt_txt).toLocaleDateString("es-ES", {
                weekday: "long",
              })}
              temp={Math.round(day.main.temp)}
              desc={day.weather[0].description}
              icon={day.weather[0].icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
