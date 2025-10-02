import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";

function App() {
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? savedMode === "true" : false;
  });

  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  // Persistencia modo oscuro
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearch = () => fetchWeather(city);
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        background: { default: "#121212", paper: "#1e1e1e" },
      }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home
        city={city}
        setCity={setCity}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
        theme={theme}
      />
    </ThemeProvider>
  );
}

export default App;
