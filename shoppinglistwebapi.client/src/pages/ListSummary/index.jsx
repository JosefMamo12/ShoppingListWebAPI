import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import api, { deleteProduct } from "../../api";
import { useTheme } from "@emotion/react";

import { useDispatch, useSelector } from "react-redux";
import {
  changeTotalItemsByValue,
  fetchTotalItems,
  selectTotalItems,
} from "../../state/totalItemsSlice";
import {
  fetchCategoriesProducts,
  selectCategoriesProducts,
} from "../../state/listSummarySlice";
import SummaryTable from "../../components/SummaryTable";

const ListSummary = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const totalItemsSelector = useSelector(selectTotalItems);
  const categoriesProducts = useSelector(selectCategoriesProducts);

  useEffect(() => {
    dispatch(fetchCategoriesProducts({}));
    dispatch(fetchTotalItems({}));
  }, [dispatch]);

  async function handleRemoveClick(product) {
    try {
      await deleteProduct(product.id);
      dispatch(changeTotalItemsByValue(-product.quantity));
      dispatch(fetchCategoriesProducts());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      {totalItemsSelector.value === 0 ? (
        <Box display="flex" justifyContent="center">
          <Typography p={5} variant="h3">
            {" "}
            רשימת הקניות ריקה אנא חזור לעמוד הבית ומלא אותה{" "}
          </Typography>
        </Box>
      ) : (
        categoriesProducts
          .filter((categories) => categories.products.length > 0)
          .map((category) => (
            <Box
              key={category.id}
              p={5}
              m={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between" // this won't affect vertical spacing
              sx={{
                backgroundColor: theme.palette.background.main,
              }}
            >
              <Box display="flex" width="100%" p={1}>
                <Typography variant="h5">{category.name}</Typography>
              </Box>
              {/* <Divider sx={{ width: "100%", border: "1px solid black" }} /> */}
              <SummaryTable
                categoryId={category.id}
                handleRemoveClick={handleRemoveClick}
                products={category.products}
              />
            </Box>
          ))
      )}
    </Box>
  );
};

export default ListSummary;
