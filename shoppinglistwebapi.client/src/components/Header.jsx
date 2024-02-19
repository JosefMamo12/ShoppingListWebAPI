﻿import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTheme } from "@emotion/react";

const Header = () => {
    const theme = useTheme();
    return (
        <Box
            width="100%"
            height="10vh"
            display="flex"
            justifyContent="center"s
            alignItems="center"
            border="2px solid green"
            borderRadius="30px"
            marginBottom="20px"
            boxShadow="0px 5px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
            backgroundColor={theme.palette.primary.main}
        >
            <Typography variant="h4" component="h2" color="white">
                רשימת קניות
            </Typography>
        </Box>
    );
};

export default Header;