/* eslint-disable no-unused-vars */
import "./App.css";

import { CssBaseline, createTheme, ThemeProvider } from "@mui/material"; // corrected import path
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeContainer from "./pages/Home";
import ListSummary from "./pages/ListSummary";
function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff", // Use green color as the primary color
      },
      secondary: {
        main: "#172633",
      },
      background: {
        main: "#afefb9", // A light background color
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif", // Change the font family
    },
    componentsDesign: {
      borderRadius: "10px",
      border: "2px solid #172633",
    },
  });

  return (
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/summary" element={<ListSummary />} action={} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  );
}

export default App;
