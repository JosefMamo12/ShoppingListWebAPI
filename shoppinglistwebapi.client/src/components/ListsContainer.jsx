import { useTheme } from "@emotion/react";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CategoryItemList from "./CategoryItemList";
import { useEffect, useState } from "react";

const ListsContainer = ({ setItems, items, categories, setCategories }) => {
  const theme = useTheme();
  return (
    <Box
      width="90%"
      marginTop={5}
      className="lists container"
      padding={5}
      borderRadius={theme.componentsDesign.borderRadius}
      backgroundColor={theme.palette.background.main}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          color="primary"
          marginBottom={2}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          מוצרים ברשימה על פי הקטגוריה המתאימה
        </Typography>
        <Divider sx={{ marginY: 2 }} />

        {items.length > 0 ? (
          <CategoryItemList
            categories={categories}
            items={items}
            setItems={setItems}
            setCategories={setCategories}
          />
        ) : (
          "הרשימה ריקה אנא מלא/י את הרשימה"
        )}
      </Box>
    </Box>
  );
};

export default ListsContainer;
