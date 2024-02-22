﻿/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increamentTotal } from "../state/totalItemsSlice";

function SearchBar({ setCategories, setItems }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [addItemFlag, setAddItemFlag] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!text || !category) {
      console.log("Please fill both fields");
      return;
    }

    setAddItemFlag(true);

    try {
      // Add product
      await fetch("https://localhost:7263/api/Product/add", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryId: category.id,
          ProductName: text,
        }),
      });
      dispatch(increamentTotal());

      // Fetch updated list of products
      await fetch("https://localhost:7263/api/Product")
        .then((response) => response.json())
        .then((data) => setItems(data));

      await fetch("https://localhost:7263/api/Category")
        .then((response) => response.json())
        .then((data) => setCategories(data));

      setAddItemFlag(false);
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
        gap={2} // Add some space between elements
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2} // Add some space between elements
        >
          <TextField
            sx={{ minWidth: "150px" }}
            id="outlined"
            variant="outlined"
            dir="rtl"
            label="רשום מוצר"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Categories category={category} onCategoryChange={setCategory} />
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              borderRadius: "10px",
              color: "white",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
              border: "2px solid green",
              minWidth: "150px",
            }}
            color="primary"
            disabled={addItemFlag}
          >
            {addItemFlag ? <CircularProgress /> : "הוסף מוצר"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchBar;
