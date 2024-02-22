﻿/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  withStyles,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increamentTotal } from "../state/totalItemsSlice";
import styled from "styled-components";
import MuiTextField from "@mui/material/TextField";

function SearchBar({ setCategories, setItems }) {
  const options = {
    shouldForwardProp: (prop) => prop !== "borderColor",
  };

  const outlinedSelectors = [
    "& .MuiOutlinedInput-notchedOutline",
    "&:hover .MuiOutlinedInput-notchedOutline",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline",
  ];

  const TextField = styled(
    MuiTextField,
    options
  )(function (_ref) {
    var borderColor = _ref.borderColor;
    return {
      "& label.Mui-focused": {
        color: borderColor,
      },
      [outlinedSelectors.join(",")]: {
        borderWidth: 3,
        borderColor: borderColor,
      },
    };
  });
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
            borderColor="white"
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
    </Box>
  );
}

export default SearchBar;
