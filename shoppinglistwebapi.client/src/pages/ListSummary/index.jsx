import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const ListSummary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return (
    <Box
      padding={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Header label="סיכום" />
      <Box display="flex" flexDirection="column">
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ fontFamily: "Anta, sans-serif" }}
            >
              Live From Space
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ListSummary;
