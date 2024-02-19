import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { CssBaseline, createTheme, ThemeProvider, Box } from '@mui/material'; // corrected import path
import { green } from '@mui/material/colors'; // Import green color from Material-UI
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import background from "./assets/background.png"
import logo from "./assets/logo.png"
function App() {

    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin]
    })
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
        <CacheProvider value={cacheRtl} >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div
                    className="App"
                    style={{
                        direction: "rtl",
                    }}
                >
                    <Box sx={{ background: `url(${background})`, margin: 0, padding: 0 }}>
                        <img src={logo} alt="Logo" width="250px" height="200px" />
                        <Box
                            mx="auto" // Center the container horizontally
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                            p={2} // Add padding for spacing
                        >
                            <Box width="50%">
                                <Header />
                            </Box>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;