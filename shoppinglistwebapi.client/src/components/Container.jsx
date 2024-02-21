import { Box } from "@mui/material";
import background from "../assets/background.png";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import ListsContainer from "./ListsContainer";
import React, { useState, useEffect } from "react";
import Header from "./Header";

const Container = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7263/api/Category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((e) => console.log(e.message));
  }, []);
  return (
    <div
      className="App"
      style={{
        direction: "rtl",
      }}
    >
      <Box sx={{ background: `url(${background})`, margin: 0, padding: 0 }}>
        <img src={logo} alt="Logo" width="250px" height="200px" />
        <Box
          mx="auto" // Center the container horizontally
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
          p={2} // Add padding for spacing
        >
          <Box width="50%">
            <Header />
            <SearchBar setCategories={setCategories} />
          </Box>
        </Box>
      </Box>
      <ListsContainer
        items={items}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

export default Container;
