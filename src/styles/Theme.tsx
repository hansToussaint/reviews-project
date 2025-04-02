import "./global.css";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CommonColors {
    mainBackground: string;
    secondaryText: string;
    backgroundGreen: string;
  }
}

const COLORS = {
  //   primary: "#1EB757",
  primary: "#101311",
  mainBackground: "#F7F9FE",
  secondaryText: "#3F4A60",
  danger: "#FF0000",
  backgroundGreen: "rgba(185, 213, 196, 0.2)",
};

const theme = createTheme({
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF",
      mainBackground: COLORS.mainBackground,
      secondaryText: COLORS.secondaryText,
      backgroundGreen: COLORS.backgroundGreen,
    },
    primary: {
      main: COLORS.primary,
    },
    error: {
      main: COLORS.danger,
    },
  },
  typography: {
    fontFamily: "inherit",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "0.4px",
      color: "#000000",
    },
    h2: {
      fontSize: "2.33rem",
      fontWeight: 500,
      color: COLORS.primary,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: COLORS.secondaryText,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: COLORS.secondaryText,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 450,
      color: COLORS.secondaryText,
    },
    body1: {
      fontSize: "1.45rem",
      fontWeight: 400,
      color: COLORS.secondaryText,
    },
  },
});

export default theme;
