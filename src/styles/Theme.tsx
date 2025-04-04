import "./global.css";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CommonColors {
    mainBackground: string;
    secondaryText: string;
    backgroundGreen: string;
    greenColor: string;
  }
}

const COLORS = {
  primary: "#101311",
  mainBackground: "#F7F9FE",
  secondaryText: "#3F4A60",
  danger: "#FF0000",
  backgroundGreen: "rgba(185, 213, 196, 0.2)",
  greenColor: "#1EB757",
};

const theme = createTheme({
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF",
      mainBackground: COLORS.mainBackground,
      secondaryText: COLORS.secondaryText,
      backgroundGreen: COLORS.backgroundGreen,
      greenColor: COLORS.greenColor,
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
      fontSize: "4rem",
      fontWeight: 700,
      letterSpacing: "0.4px",
      color: "#000000",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 450,
      color: COLORS.primary,
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: 500,
      color: "#0000000",
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
