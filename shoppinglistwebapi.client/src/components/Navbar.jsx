import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Css } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const drawerWidth = 240;
  const navItems = [
    { id: 1, link: "/", label: " Home Page" },
    { id: 2, link: "/summary", label: "סיכום הרשימה" },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        רשימת קניות
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        dir="rtl"
        component="nav"
        sx={{ backgroundColor: "#384ac2" }}
        position="sticky"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <img src={logo} alt="Logo" width="250px" height="175px" />
          </Box>

          <Box sx={{ display: "flex", gap: "2rem" }}>
            {navItems.map((item) => (
              <Button key={item.id}>
                <Link to={item.link}>
                  <Typography
                    component="h2"
                    variant="h5"
                    sx={{ color: "white", fontFamily: "Anta, sans-serif" }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    // <nav className="nav" dir="rtl">
    //   <a href="/" className="site-title">
    //     רשימת קניות
    //   </a>
    //   <ul>
    //     {navItems.map((item) => (
    //       <li key={item.id}>
    //         <Link to={item.link}> {item.label}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Navbar;
