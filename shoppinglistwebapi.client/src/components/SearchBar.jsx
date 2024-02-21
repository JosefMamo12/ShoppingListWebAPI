/* eslint-disable no-unused-vars */
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

function SearchBar({ setCategories }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [addItemFlag, setAddItemFlag] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const handleClick = async () => {
    if (!text || !category) {
      console.log("Please fill both fields");
      return;
    }

    setAddItemFlag(true);

    try {
      // Add product
      await fetch("https://localhost:7263/api/Product", {
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

      // Fetch updated list of products
      const response = await fetch("https://localhost:7263/api/Category");
      const data = await response.json();
      console.log(data);
      setCategories(data);

      // Reset flag and clear input field
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
