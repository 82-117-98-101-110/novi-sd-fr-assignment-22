import { ThemeProvider } from "styled-components";

const theme = {
  colour: {
    primaryDark: "#000000",
    primaryLight: "#ffffff",
    backgroundDark: "#000000",
    backgroundLight: "#ffffff",
    link: "#3d3d3d",

    PrimaryPurpleBlue500: "#4318FF",

    primary: {
      purpleBlue100: "#E9E3FF",
      purpleBlue500: "#4318FF",
      purpleBlue700: "#2200B7",
    },
    secondary: {
      dark: "#000000",
      light: "#ffffff",
      grey500: "#E0E5F2",
      grey300: "#F4F7FE",
    },
    secondaryDark: "#000000",
    secondaryLight: "#ffffff",
  },
  //TODO styling: see which components are using below, transfer these to GlobalStyles.js and remove below
  font: {
    family: "DMSans",
    size: {
      title: {
        medium: "18px",
        large: "24px",
        extraLarge: "32px",
      },
      text: {
        extraSmall: "10px",
        small: "12px",
        medium: "15px",
        large: "18px",
        extraLarge: "24px",
      },
    },
    weight: {
      regular400: "400",
      medium500: "500",
      bold700: "700",
    },
  },
  breakpoint: {
    mobile: "375px",
    tablet: "600px",
    laptop: "1200px",
    desktop: "1600px",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
