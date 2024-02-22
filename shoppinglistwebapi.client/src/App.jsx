/* eslint-disable no-unused-vars */
import "./App.css";

import { CssBaseline, createTheme, ThemeProvider } from "@mui/material"; // corrected import path
import { green } from "@mui/material/colors"; // Import green color from Material-UI
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Container from "./components/Container";
import { useDispatch } from "react-redux";
function App() {

    
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: green[500], // Use green color as the primary color
      },
      secondary: {
        main: "#f44336",
      },
      background: {
        main: "#f0f5f1", // A light background color
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif", // Change the font family
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
