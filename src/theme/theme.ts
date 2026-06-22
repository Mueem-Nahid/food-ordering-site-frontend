"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const darkBrown = "#1c1816";
const lightBrown = "#48413e";
const brandRed = "#ff741f";

const baseTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: brandRed,
      contrastText: "#ffffff",
    },
    secondary: {
      main: lightBrown,
    },
    background: {
      default: "#000000",
      paper: darkBrown,
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
    error: {
      main: "#e4002b",
    },
    divider: lightBrown,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          overflowX: "clip",
          WebkitTextSizeAdjust: "100%",
          textSizeAdjust: "100%",
        },
        body: {
          overflowX: "clip",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        img: {
          maxWidth: "100%",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          fontWeight: 600,
        },
        contained: {
          padding: "0.6rem 1.2rem",
        },
        outlined: {
          padding: "0.6rem 1.2rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          minWidth: 44,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@media (min-width: 600px)": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0.75rem 0.5rem",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: "1rem 1rem",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: brandRed,
          },
          "&:hover fieldset": {
            borderColor: brandRed,
          },
          "&.Mui-focused fieldset": {
            borderColor: brandRed,
          },
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ["xs", "sm", "md", "lg"],
  factor: 2,
});
