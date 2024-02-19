/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
    Button,
    CircularProgress,
    TextField,
    Typography,
    useMediaQuery,
    Box
} from "@mui/material";
import Categories from "./Categories";

function SearchBar() {
    const theme = useTheme();
    const [text, setText] = useState("");

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2} // Add some space between elements
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2} // Add some space between elements
                >
                    <TextField
                        id="outlined"
                        variant="outlined"
                        dir="rtl"
                        label="רשום מוצר"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Categories/>
                </Box>
            </Box>
        </Box>
    );

}

export default SearchBar;