import { Box } from "@mui/material";
import React from "react";
import NavbarNew from "../../components/NavbarNew";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Box>
        <NavbarNew />
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
