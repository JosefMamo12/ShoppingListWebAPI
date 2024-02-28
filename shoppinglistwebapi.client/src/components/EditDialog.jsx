import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { changeTotalItemsByValue } from "../state/totalItemsSlice";
import { fetchCategoriesProducts } from "../state/listSummarySlice";

const EditDialog = ({ productId, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  const handleSubmit = async () => {
    if (productName != null || productQuantity != null) {
      console.log(`Name: ${productName} Quantity: ${productQuantity} `);
      await api.put(`api/Product/${productId}`, {
        Name: productName,
        Quantity: productQuantity,
      });
      dispatch(changeTotalItemsByValue(productQuantity));
      const response = await api.get("api/Category/products");
      dispatch(fetchCategoriesProducts());
      handleClose();
    }
  };
  console.log("Render EditDialog");
  console.log(productId);

  const dispatch = useDispatch();
  const [productName, setProudctName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  return (
    <Dialog
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
          onChange={(e) => setProudctName(e.target.value)}
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
