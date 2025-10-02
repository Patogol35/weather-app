import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import Home from "./Home";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? savedMode === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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
      <Home darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} />
    </ThemeProvider>
  );
}

export default App;
