// src/styles/appStyles.js
export const appStyles = {
  root: (darkMode, theme) => ({
    minHeight: "100vh",
    backgroundColor: darkMode ? theme.palette.background.default : undefined,
    color: darkMode ? theme.palette.text.primary : undefined,
    transition: "all 0.4s ease",
  }),

  darkModeBtn: {
    "&:hover": { backgroundColor: "transparent" },
    "&:focus": { outline: "none" },
    transition: "color 0.3s ease",
  },

  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
    padding: "0 1rem",
  },

  subtitle: {
    padding: "0 1rem",
  },

  searchBox: {
    display: "flex",
    gap: "8px",
    padding: "0 1rem",
  },

  error: {
    padding: "0 1rem",
    color: "red",
  },

  loading: {
    padding: "0 1rem",
  },
};
