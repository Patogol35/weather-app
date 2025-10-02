import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import useWeather from "./hooks/useWeather";
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

// 🔹 Importamos estilos externos de MUI
import {
  darkModeButtonSx,
  searchButtonSx,
  appContainerStyle,
  headerContainerStyle,
  iconContainerStyle,
  searchContainerStyle,
} from "./muiStyles";

function App() {
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? savedMode === "true" : false;
  });
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
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

      <div style={appContainerStyle(darkMode, theme)}>
        {/* Botón modo oscuro */}
        <div style={iconContainerStyle}>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            disableRipple
            sx={darkModeButtonSx}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        {/* Header */}
        <div style={headerContainerStyle}>
          <h1>Consulta el Clima</h1>
        </div>

        <p className="subtitle" style={{ padding: "0 1rem" }}>
          Desarrollado por Jorge Patricio Santamaría Cherrez
        </p>

        {/* Buscador */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Ingresa una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<Search />}
            disabled={loading}
            sx={searchButtonSx}
          >
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {/* Mensajes */}
        {error && <p className="error" style={{ padding: "0 1rem" }}>{error}</p>}
        {loading && <p style={{ padding: "0 1rem" }}>⏳ Cargando...</p>}

        {/* Clima actual */}
        {weather && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WeatherCard weather={weather} />
          </motion.div>
        )}

        {/* Pronóstico */}
        {forecast.length > 0 && !loading && (
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
