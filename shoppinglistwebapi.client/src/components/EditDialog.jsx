import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { changeTotalItemsByValue } from "../state/totalItemsSlice";
import { fetchCategoriesProducts } from "../state/listSummarySlice";
import Categories from "./Categories";

const EditDialog = ({ open, productId, handleClose }) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const getCategory = async () => {
      const response = await api.get(`api/Category/${productId}`);
      setCategory(response.data);
    };
    getCategory();
  }, [productId]);
  const handleSubmit = async () => {
    if (
      productName != null ||
      productQuantity != null ||
      productCategory != null
    ) {
      console.log(
        `Name: ${productName} Quantity: ${productQuantity} CategoryId: ${JSON.stringify(
          productCategory.id
        )}`
      );
      await api.put(`api/Product/${productId}`, {
        Name: productName,
        Quantity: productQuantity,
        CategoryId: productCategory
          ? JSON.stringify(productCategory.id)
          : category.id,
      });
      dispatch(changeTotalItemsByValue(productQuantity));
      dispatch(fetchCategoriesProducts());
      handleClose();
    }
  };
  console.log("Render EditDialog");

  return (
    <Dialog
      key={productId}
      dir="rtl"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>ערוך מוצר</DialogTitle>
      <DialogContent>
        <DialogContentText>
          אם ברצונך לשנות את כמויות המוצר או את שם המוצר
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          onChange={(e) => setProductName(e.target.value)}
          id="name"
          name="productName"
          label="שם המוצר"
          type="string"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          onChange={(e) => setProductQuantity(e.target.value)}
          name="productQuantity"
          label="כמות המוצר"
          type="number"
          fullWidth
          variant="standard"
        />
        <Box mt={2} display="flex" justifyContent="center">
          <Categories
            category={category}
            label="ערוך קטוגריה"
            onCategoryChange={setProductCategory}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "black" }} onClick={handleClose}>
          בטל
        </Button>
        <Button sx={{ color: "black" }} onClick={handleSubmit}>
          ערוך
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
