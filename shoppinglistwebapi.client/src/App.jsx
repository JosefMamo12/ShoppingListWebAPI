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
import Layout from "./pages/Layout";
function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#ffffff", // Use green color as the primary color
      },
      secondary: {
        main: "#172633",
      },
      background: {
        main: "#faf9f9", // A light background color
      },
    },
    typography: {
      fontFamily: "Heebo, sans-serif", // Change the font family
    },
    componentsDesign: {
      borderRadius: "10px",
      border: "2px solid #172633",
    },
  });

  return (
    <div className="App">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/summary" element={<ListSummary />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
