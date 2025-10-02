// 🔹 Estilos para el botón de modo oscuro
export const darkModeButtonSx = {
  "&:hover": { backgroundColor: "transparent" },
  "&:focus": { outline: "none" },
  transition: "color 0.3s ease",
};

// 🔹 Estilos para el botón de búsqueda
export const searchButtonSx = {
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: "8px",
};

// 🔹 Contenedor principal
export const appContainerStyle = (darkMode, theme) => ({
  minHeight: "100vh",
  backgroundColor: darkMode ? theme.palette.background.default : undefined,
  color: darkMode ? theme.palette.text.primary : undefined,
  transition: "all 0.4s ease",
});

// 🔹 Header
export const headerContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
  padding: "0 1rem",
};

// 🔹 Icono DarkMode container
export const iconContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem 1rem 0 1rem",
};

// 🔹 Search container
export const searchContainerStyle = {
  display: "flex",
  gap: "8px",
  padding: "0 1rem",
};
