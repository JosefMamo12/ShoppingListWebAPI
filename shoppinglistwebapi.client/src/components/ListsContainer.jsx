import { useTheme } from "@emotion/react";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CategoryItemList from "./CategoryItemList";
import { useEffect, useState } from "react";

const ListsContainer = ({ categories, setCategories }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7263/api/Product")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);
  const theme = useTheme();
  return (
    <Box
      marginTop={5}
      className="lists container"
      padding={5}
      borderRadius="10px"
      backgroundColor={theme.palette.background.main}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" // Add a subtle box shadow
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" color="primary" marginBottom={2}>
          מוצרים ברשימה על פי הקטגוריה המתאימה
        </Typography>
      </Box>
      <Divider sx={{ marginY: 2 }} />

      <CategoryItemList
        categories={categories}
        items={items}
        setItems={setItems}
        setCategories={setCategories}
      />
    </Box>
  );
};

export default ListsContainer;
