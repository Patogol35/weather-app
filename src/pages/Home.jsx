import { IconButton, Button } from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import { styles } from "../styles/appStyles";

function Home({
  city,
  setCity,
  darkMode,
  setDarkMode,
  handleSearch,
  handleKeyDown,
  weather,
  forecast,
  loading,
  error,
  theme,
}) {
  return (
    <div
      className="app"
      style={{
        ...styles.app,
        backgroundColor: darkMode ? theme.palette.background.default : undefined,
        color: darkMode ? theme.palette.text.primary : undefined,
      }}
    >
      {/* Botón modo oscuro */}
      <div style={styles.headerRight}>
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
      <div style={styles.headerLeft}>
        <h1>Consulta el Clima</h1>
      </div>
      <p style={styles.subtitle}>Desarrollado por Jorge Patricio Santamaría Cherrez</p>

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
      {loading && <p style={{ padding: "0 1rem" }}>⏳ Cargando...</p>}

      {/* Clima actual */}
      {weather && !loading && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
