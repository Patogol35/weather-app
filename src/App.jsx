import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import Home from "./pages/Home"; // 👈 Página principal
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? savedMode === "true" : false;
  });

  // Persistencia de modo oscuro
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Configuración global del theme
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
      {/* Pasamos darkMode y setDarkMode como props */}
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default App;
