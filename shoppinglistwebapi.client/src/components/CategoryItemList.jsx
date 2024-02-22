/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import {
  Box,
  List,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import CustomListItem from "./CustomListItem";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
const CategoryItemList = ({ categories, items, setItems, setCategories }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent="space-around"
      gap={2}
    >
      {categories.length === 0 ? (
        <CircularProgress />
      ) : (
        categories
          .filter((category) => category.categoryQuantity > 0)
          .map((category) => (
            <Paper
              key={category.id}
              elevation={3}
              sx={{
                minWidth: "200px",
                marginBottom: 2,
                padding: 2,
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ color: "#333" }}>
                {category.name} - {category.categoryQuantity} מוצרים
              </Typography>
              <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
              <FireNav>
                <List key={category.id} dense>
                  {items
                    .filter((item) => item.categoryId === category.id)
                    .map((item) => (
                      <CustomListItem
                        key={item.id}
                        item={item}
                        setItems={setItems}
                        setCategories={setCategories}
                      />
                    ))}
                  {<Divider />}
                </List>
              </FireNav>
            </Paper>
          ))
      )}
    </Box>
  );
};

export default CategoryItemList;
