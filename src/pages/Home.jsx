import { useState } from "react";
import { IconButton, Button } from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import useWeather from "../hooks/useWeather";
import styles from "./Home.styles"; // 👈 Importamos estilos

function Home({ darkMode, setDarkMode }) {
  const [city, setCity] = useState("");
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="app"
      style={darkMode ? styles.appDark : styles.appLight}
    >
      {/* Botón modo oscuro */}
      <div style={styles.darkModeButtonWrapper}>
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
          disableRipple
          sx={styles.iconButton}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <h1>Consulta el Clima</h1>
      </div>

      <p className="subtitle" style={styles.subtitle}>
        Desarrollado por Jorge Patricio Santamaría Cherrez
      </p>

      {/* Buscador */}
      <div style={styles.search}>
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
          sx={styles.searchButton}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {/* Mensajes */}
      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>⏳ Cargando...</p>}

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
  );
}

export default Home;
