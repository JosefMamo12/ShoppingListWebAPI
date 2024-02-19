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

function SearchBar() {
    const theme = useTheme();
    const [text, setText] = useState("");

  return (
    <p>Hello world!</p>
  );
}

export default SearchBar;