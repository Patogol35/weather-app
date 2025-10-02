const styles = {
  appLight: {
    minHeight: "100vh",
    transition: "all 0.4s ease",
  },
  appDark: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    transition: "all 0.4s ease",
  },
  darkModeButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1rem 0 1rem",
  },
  iconButton: {
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
  search: {
    display: "flex",
    gap: "8px",
    padding: "0 1rem",
  },
  searchButton: {
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  error: {
    padding: "0 1rem",
    color: "red",
    fontWeight: "bold",
  },
  loading: {
    padding: "0 1rem",
  },
};

export default styles;
