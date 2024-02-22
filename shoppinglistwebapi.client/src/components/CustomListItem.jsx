import {
  ListItem,
  IconButton,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { decrementTotal, increamentTotal } from "../state/totalItemsSlice";

const CustomListItem = ({ item, setItems, setCategories }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const totalItemsSelector = useSelector((state) => state.totalItems.value);

  const handleAdd = async () => {
    setIsAdding(true);
    // Add product
    try {
      await fetch("https://localhost:7263/api/Product/add", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryId: item.categoryId,
          ProductName: item.name,
        }),
      });

      dispatch(increamentTotal());
      await fetch("https://localhost:7263/api/Product")
        .then((response) => response.json())
        .then((data) => setItems(data))
        .finally(setIsAdding(false));
      await fetch("https://localhost:7263/api/Category")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    } catch (error) {
      console.error("Error while uploading to the db", error.message);
    }
  };

  const handleSubtract = async () => {
    try {
      setIsRemoving(true);
      await fetch("https://localhost:7263/api/Product/subtract", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryId: item.categoryId,
          ProductName: item.name,
        }),
      });
      dispatch(decrementTotal());
      await fetch("https://localhost:7263/api/Product")
        .then((response) => response.json())
        .then((data) => setItems(data))
        .finally(setIsRemoving(false));
      await fetch("https://localhost:7263/api/Category")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    } catch (error) {
      console.error("Error while uploading to the db", error.message);
    }
  };

  return (
    <ListItem id={item.id} sx={{ borderBottom: "1px solid #A5E9C7" }}>
      <ListItemText primary={item.name} />
      <IconButton
        aria-label="add"
        size="small"
        onClick={() => handleAdd()}
        disabled={isAdding}
      >
        {isAdding ? <CircularProgress /> : <AddIcon fontSize="inherit" />}
      </IconButton>
      <IconButton
        aria-label="add"
        size="small"
        onClick={() => handleSubtract(item)}
        disabled={isRemoving}
      >
        {isRemoving ? <CircularProgress /> : <RemoveIcon fontSize="inherit" />}
      </IconButton>

      <ListItemSecondaryAction>
        <Typography variant="body2">{item.quantity + "x"} </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CustomListItem;
