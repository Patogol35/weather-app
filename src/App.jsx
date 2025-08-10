import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    try {
      // Petición para datos actuales
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      setWeather(current.data);

      // Petición para pronóstico (5 días / 3 horas)
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      // Filtramos solo 1 pronóstico por día (a la misma hora)
      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);
      setError("");
    } catch (err) {
      setError("Ciudad no encontrada");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
   <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6">
  <h1 className="text-4xl font-bold mb-2">Consulta el Clima</h1>
  <p className="text-lg mb-6">Desarrollado por Jorge Patricio Santamaría Cherrez</p>

  <div className="flex gap-2 mb-6 w-full max-w-md">
    <input
      type="text"
      placeholder="Ingresa una ciudad"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="flex-1 p-3 rounded-lg text-black outline-none"
    />
    <button
      onClick={getWeather}
      className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition"
    >
      Buscar
    </button>
  </div>
</div>

      {error && <p className="text-red-300">{error}</p>}

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <WeatherCard weather={weather} />
        </motion.div>
      )}

      {forecast.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {forecast.map((item, index) => (
            <ForecastCard key={index} data={item} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default App;


