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
import { getCategories } from "../api/GetCategory";

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
const CategoryItemList = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const categories = getCategories();

  useEffect(() => {
        if(categories === null){
            setCategoriesLoading(true);
        }else{
            setCategoriesLoading(false);
        }
  },[categories])



  if (categoriesLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent="space-around"
      gap={2}
    >
      {categories
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
              <List dense>
                {/* {itemsFiltered
                  .filter((item) => item.category_id === category.id)
                  .map((item) => (
                    // <CustomListItem/>
                  ))} */}
                {<Divider />}
              </List>
            </FireNav>
          </Paper>
        ))}
    </Box>
  );
};

export default CategoryItemList;