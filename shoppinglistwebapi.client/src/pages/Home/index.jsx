import { Box, Button, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import ListsContainer from "../../components/ListsContainer";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalItems } from "../../state/totalItemsSlice";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const selectorTotalItems = useSelector((state) => state.totalItems);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchTotalItems({}));
  }, [dispatch]);

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
        marginTop: "30px",
      }}
    >
      <Box padding={5} width="100%">
        <Header label="רשימת קניות" />
      </Box>
      <Box
        sx={{
          background: theme.palette.background.main,
          margin: 0,
          padding: 0,
          width: "90%",
          borderRadius: theme.componentsDesign.borderRadius,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
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
          <Box>
            <SearchBar setCategories={setCategories} setItems={setItems} />
          </Box>
          <Box
            padding={5}
            marginTop={5}
            marginBottom={5}
            sx={{
              borderRadius: theme.componentsDesign.borderRadius,
              background: theme.palette.primary.main,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography component="h2" variant="h4">
              {"כמות המוצרים ברשימה: " + selectorTotalItems.value}
            </Typography>
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
            color: "black",
            fontSize: "30px",
          }}
        >
          <Link to="/summary">סיכום הרשימה</Link>
        </Button>
      </Box>
    </div>
  );
};

export default HomeContainer;
