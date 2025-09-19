import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import useWeather from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const handleSearch = () => fetchWeather(city);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContent
        theme={theme}
        city={city}
        setCity={setCity}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
        handleSearch={handleSearch}
      />
    </ThemeProvider>
  );
}

function MainContent({
  theme,
  city,
  setCity,
  darkMode,
  setDarkMode,
  weather,
  forecast,
  loading,
  error,
  handleSearch,
}) {
  return (
    <div className="app" style={{ minHeight: "100vh", transition: "0.4s" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1>Consulta el Clima</h1>
      </header>

      <p className="subtitle">
        Desarrollado por Jorge Patricio Santamaría Cherrez
      </p>

      {/* Buscador */}
      <div className="search">
        <input
          type="text"
          placeholder="Ingresa una ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <WeatherCard weather={weather} />
        </motion.div>
      )}

      {forecast.length > 0 && (
        <motion.div
          className="forecast-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {forecast.map((f, i) => (
            <ForecastCard key={i} data={f} />
          ))}
        </motion.div>
      )}

      {/* Botón modo oscuro sin fondo y con color del tema */}
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        color="inherit"  // usa el color del tema actual
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          "&:hover": { backgroundColor: "transparent" }, // sin fondo en hover
          transition: "color 0.3s ease",
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
      }
