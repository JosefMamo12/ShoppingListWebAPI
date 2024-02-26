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
import { useDispatch } from "react-redux";
import { decrementTotal, incrementTotal } from "../state/totalItemsSlice";
import { useTheme } from "@emotion/react";

const CustomListItem = ({ id, item, setItems, setCategories }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

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

      dispatch(incrementTotal());
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
    <ListItem id={id} sx={{ borderBottom: "1px solid #A5E9C7" }}>
      <ListItemText
        primary={item.name}
        primaryTypographyProps={{ fontSize: "20px" }}
        sx={{paddingRight: "10px"}}
      />
      <IconButton
        aria-label="add"
        size="md"
        onClick={() => handleAdd()}
        disabled={isAdding}
      >
        {isAdding ? <CircularProgress /> : <AddIcon fontSize="inherit" />}
      </IconButton>
      <IconButton
        aria-label="add"
        size="md"
        onClick={() => handleSubtract(item)}
        disabled={isRemoving}
      >
        {isRemoving ? <CircularProgress /> : <RemoveIcon fontSize="inherit" />}
      </IconButton>

      <ListItemSecondaryAction>
        <Typography variant="body6">{item.quantity + "x"} </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CustomListItem;
