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

const ListSummary = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const totalItemsSelector = useSelector(selectTotalItems);
  const categoriesProducts = useSelector(selectCategoriesProducts);
  const [openEditDialogs, setOpenEditDialogs] = useState([]); // State to manage open/close state for edit dialogs

  useEffect(() => {
    dispatch(fetchCategoriesProducts({}));
    dispatch(fetchTotalItems({}));
  }, [dispatch]);

  async function handleRemoveClick(product) {
    try {
      await api.delete(`api/Product/${product.id}`);
    } catch (error) {
      console.log(error);
    }
    dispatch(changeTotalItemsByValue(-product.quantity));
    dispatch(fetchCategoriesProducts());
  }

  const handleEditClick = (index) => {
    console.log(index);
    // Open the edit dialog for the corresponding product
    const newOpenEditDialogs = [...openEditDialogs];
    newOpenEditDialogs[index] = true;
    setOpenEditDialogs(newOpenEditDialogs);
  };

  const handleCloseEditDialog = (index) => {
    // Close the edit dialog for the corresponding product
    const newOpenEditDialogs = [...openEditDialogs];
    newOpenEditDialogs[index] = false;
    setOpenEditDialogs(newOpenEditDialogs);
  };

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
              key={category.name}
              p={5}
              m={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between" // this won't affect vertical spacing
              sx={{
                backgroundColor: theme.palette.background.main,
              }}
            >
              <Box display="flex" width="100%" justifyContent="center">
                <Typography variant="h5">{category.name}</Typography>
              </Box>
              <Divider sx={{ width: "100%", border: "1px solid black" }} />
              <List>
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
                        <IconButton
                          onClick={async () => await handleRemoveClick(product)}
                        >
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
              </List>
            </Box>
          ))
      )}
    </Box>
  );
};

export default ListSummary;
