import { Box, Button } from "@mui/material";
import background from "../../assets/background.png";
import logo from "../../assets/logo.png";
import SearchBar from "../../components/SearchBar";
import ListsContainer from "../../components/ListsContainer";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalItems } from "../../state/totalItemsSlice";
import { useTheme } from "@emotion/react";

const HomeContainer = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const selectorTotalItems = useSelector((state) => state.totalItems);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchTotalItems({}));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7263/api/Product")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((e) => console.log(e.message));
  }, []);

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: `url(${background})`,
          margin: 0,
          padding: 0,
          width: "90%",
        }}
      >
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
            <SearchBar setCategories={setCategories} setItems={setItems} />
          </Box>
          <Box padding={5}>
            {"כמות המוצרים ברשימה: " + selectorTotalItems.value}
          </Box>
        </Box>
      </Box>
      <ListsContainer
        items={items}
        categories={categories}
        setCategories={setCategories}
        setItems={setItems}
      />
      <Box padding={10}>
        <Button
          variant="contained"
          sx={{
            width: "300px",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            fontSize: "30px"
          }}
        >
          {" "}
          סיכום הרשימה{" "}
        </Button>
      </Box>
    </div>
  );
};

export default HomeContainer;
