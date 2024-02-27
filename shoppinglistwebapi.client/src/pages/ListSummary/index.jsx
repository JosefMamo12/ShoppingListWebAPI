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
  decrementTotalByValue,
  fetchTotalItems,
} from "../../state/totalItemsSlice";
import EditDialog from "../../components/EditDialog";

const ListSummary = () => {
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const theme = useTheme();
  const totalItemsSelector = useSelector((state) => state.totalItems);
  const dispatch = useDispatch();
  const [openEditDialogs, setOpenEditDialogs] = useState([]); // State to manage open/close state for edit dialogs

  useEffect(() => {
    async function getData() {
      const products = await api.get("api/Category/products");
      setCategoriesProducts(products.data);
    }
    async function getTotalItems() {
      dispatch(fetchTotalItems({}));
    }
    getData();
    getTotalItems();
  }, [dispatch]);

  async function handleRemoveClick(product) {
    try {
      await api.delete(`api/Product/${product.id}`);
    } catch (error) {
      console.log(error);
    }
    const products = await api.get("api/Category/products");
    dispatch(decrementTotalByValue(product.quantity));
    setCategoriesProducts(products.data);
  }

  const handleEditClick = (index) => {
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
      <nav aria-label="main">
        {totalItemsSelector.value === 0 ? (
          <Typography p={5} variant="h3">
            {" "}
            רשימת הקניות ריקה אנא חזור לעמוד הבית ומלא אותה{" "}
          </Typography>
        ) : (
          categoriesProducts
            .filter((categories) => categories.products.length > 0)
            .map((category) => (
              <Box
                key={category.name}
                p={5}
                m={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between" // this won't affect vertical spacing
                sx={{
                  backgroundColor: theme.palette.background.main,
                  width: "90%",
                }}
              >
                <Box display="flex" width="100%" justifyContent="center" mb={1}>
                  <Typography variant="h5">{category.name}</Typography>
                </Box>
                <Divider sx={{ width: "100%", border: "1px solid black" }} />
                <List>
                  {category.products.map((product, index) => {
                    return (
                      <ListItem key={product.id} disablePadding>
                        <ListItemText primary={product.name} />
                        <ListItemText primary={product.quantity} />
                        <IconButton onClick={() => handleEditClick(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={async () => await handleRemoveClick(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <EditDialog
                          open={openEditDialogs[index] || false} // Pass the open state for the corresponding edit dialog
                          setOpen={(isOpen) => handleCloseEditDialog(index)}
                        />
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
