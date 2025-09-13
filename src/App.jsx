import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { motion } from "framer-motion";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Button,
} from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import "./App.css";
const API_KEY = import.meta.env.VITE_API_KEY;
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const getWeather = async () => {
    if (!city) return;
    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      setWeather(current.data);
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      }),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="app"
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode
            ? theme.palette.background.default
            : undefined,
          color: darkMode ? theme.palette.text.primary : undefined,
          transition: "all 0.4s ease",
        }}
      >
        {/* Header con título y botón modo oscuro */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h1>Consulta el Clima</h1>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              backgroundColor: darkMode ? "#333" : "#ffffff",
              color: darkMode ? "#f5f5f5" : "#333",
              boxShadow: darkMode
                ? "0 0 6px rgba(0,0,0,0.4)"
                : "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5",
              },
              borderRadius: "50%",
              transition: "all 0.3s ease",
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <p className="subtitle">
          Desarrollado por Jorge Patricio Santamaría Cherrez
        </p>
        {/* Buscador con botón MUI */}
        <div className="search" style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Ingresa una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={getWeather}
            startIcon={<Search />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Buscar
          </Button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WeatherCard weather={weather} />
          </motion.div>
        )}
        {forecast.length > 0 && (
          <motion.div
            className="forecast-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {forecast.map((item, index) => (
              <ForecastCard key={index} data={item} />
            ))}
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}
export default App;
