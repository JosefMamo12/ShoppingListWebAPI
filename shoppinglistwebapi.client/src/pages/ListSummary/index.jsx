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
import React, { Fragment, useEffect, useState } from "react";
import api from "../../api";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTotalItemsByValue,
  fetchTotalItems,
  selectTotalItems,
} from "../../state/totalItemsSlice";
import EditDialog from "../../components/EditDialog";
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
    console.log(categoriesProducts);
  }, [dispatch]);

  async function handleRemoveClick(product) {
    try {
      await api.delete(`api/Product/${product.id}`);
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
              />
              {/* <List>
                {category.products.map((product, index) => {
                  return (
                    <ListItem key={product.id} disablePadding>
                      <Box width="100%">
                        <ListItemText primary={product.name} />
                      </Box>
                      <Box width="100%" marginLeft={7}>
                        <ListItemText primary={product.quantity} />
                      </Box>
                      <Box display="flex">
                        <IconButton onClick={() => handleEditClick(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveClick(product)}>
                          <DeleteIcon />
                        </IconButton>
                        <EditDialog
                          productId={product.id}
                          open={openEditDialogs[index] || false} // Pass the open state for the corresponding edit dialog
                          setOpen={(isOpen) => handleCloseEditDialog(index)}
                        />
                      </Box>
                    </ListItem>
                  );
                })}
              </List> */}
            </Box>
          ))
      )}
    </Box>
  );
};

export default ListSummary;
