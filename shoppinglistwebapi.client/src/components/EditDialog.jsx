import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

const EditDialog = ({ open, setOpen }) => {
  const handleClose = () => {

    setOpen(false);
    console.log(open);
  };
  console.log("Render EditDialog");

  return (
    <Dialog
      dir="rtl"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>ערוך מוצר</DialogTitle>
      <DialogContent>
        <DialogContentText>
          אם ברצונך לשנות את כמויות המוצר או את שם המוצר
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="productName"
          label="שם המוצר"
          type="string"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="quantity"
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
        <Button sx={{ color: "black" }} type="submit">
          ערוך
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
