﻿﻿/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { incrementTotal } from "../state/totalItemsSlice";
import { useTheme } from "@emotion/react";
import { addProduct, getCategories, getProducts } from "../api";

function SearchBar({ setCategories, setItems }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [addItemFlag, setAddItemFlag] = useState(false);
  const [key, setKey] = useState(0);
  const theme = useTheme();

  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClick = async () => {
    if (!text || !category) {
      console.log("Please fill both fields");
      return;
    }
    setKey(key + 1);
    setAddItemFlag(true);

    try {
      // Add product
      await addProduct(text, category.id);
      dispatch(incrementTotal());
      // Fetch updated list of products
      setItems(await getProducts());
      setCategories(await getCategories());

      setAddItemFlag(false);
      setText("");
    } catch (error) {
      console.error("Error:", error);
      setAddItemFlag(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={matches ? "column" : "row"}
        gap={2} // Add some space between elements
      >
        <TextField
          id="outlined"
          variant="outlined"
          dir="rtl"
          label="רשום מוצר"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            minWidth: "200px",
            backgroundColor: "white",
            borderRadius: theme.componentsDesign.borderRadius,
          }}
        />
        <Categories
          key={key}
          label="בחר קטגוריה"
          category={category}
          onCategoryChange={setCategory}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            borderRadius: theme.componentsDesign.borderRadius,
            color: "black",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
            minWidth: "200px",
            fontSize: "23px",
          }}
          color="primary"
          disabled={addItemFlag}
        >
          {addItemFlag ? <CircularProgress /> : "הוסף מוצר"}
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBar;
