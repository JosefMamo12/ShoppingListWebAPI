import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { decrementTotalByValue } from "../../state/totalItemsSlice";

const ListSummary = () => {
  const [categroiesProducts, setCategoriesProducts] = useState([]);
  const theme = useTheme();
  const totalItemsSelector = useSelector((state) => state.totalItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const products = await api.get("api/Category/products");
      setCategoriesProducts(products.data);
    }
    getData();
  }, []);

  async function handleRemoveClick(product) {
    try {
      const response = await api.delete(`api/Product/${product.id}`);
      dispatch(decrementTotalByValue(product.quantity))
    } catch (error) {
      console.log(error);
    }
    const products = await api.get("api/Category/products");
    setCategoriesProducts(products.data);
  }
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <nav aria-label="main">
        {totalItemsSelector.value === 0 ? (
          <Typography p={5} variant="h5">
            {" "}
            רשימת הקניות ריקה אנא חזור לעמוד הבית ומלא אותה{" "}
          </Typography>
        ) : (
          categroiesProducts
            .filter((categories) => categories.products.length > 0)
            .map((category) => (
              <Box
                key={category.name}
                p={5}
                m={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between" // this won't affect vertical spacing
                sx={{
                  backgroundColor: theme.palette.background.main,
                  width: "100%",
                }}
              >
                {category.name}
                <Divider sx={{ width: "100%", border: "1px solid black" }} />
                <List>
                  {category.products.map((product) => {
                    return (
                      <ListItem key={product.id} disablePadding>
                        <ListItemText primary={product.name} />
                        <ListItemText primary={product.quantity} />
                        <IconButton
                          onClick={async () => await handleRemoveClick(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            ))
        )}
      </nav>
    </Box>
  );
};

export default ListSummary;
