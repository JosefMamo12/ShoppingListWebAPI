import React, { useState, useEffect, Fragment } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { DataGrid, arSD, heIL } from "@mui/x-data-grid";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import api from "../api";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import EditDialog from "./EditDialog";

// Create rtl cache
const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function SummaryTable({
  products,
  categoryId,
  handleRemoveClick,
}) {
  const dispatch = useDispatch();
  const [openEditDialogs, setOpenEditDialogs] = useState([]);

  const handleOpenClicked = (index) => {
    // Open the edit dialog for the corresponding product
    const newOpenEditDialogs = [...openEditDialogs];
    newOpenEditDialogs[index] = true;
    setOpenEditDialogs(newOpenEditDialogs);
  };

  const handleCloseClicked = (index) => {
    // Close the edit dialog for the corresponding product
    const newOpenEditDialogs = [...openEditDialogs];
    newOpenEditDialogs[index] = false;
    setOpenEditDialogs(newOpenEditDialogs);
  };

  const columns = [
    {
      field: "id",
      headerName: "מספר מזהה",
      width: 200,
    },
    {
      field: "name",
      headerName: "שם המוצר",
      width: 200,
    },
    {
      field: "quantity",
      headerName: "כמות",
      width: 200,
    },

    {
      field: "edit",
      headerName: "פעולות",
      width: 150,

      renderCell: (params) => {
        return (
          <Fragment>
            <Stack direction="row">
              <span>
                <IconButton onClick={() => handleOpenClicked(params.id)}>
                  <Edit />
                </IconButton>
              </span>
              <span>
                <IconButton onClick={() => handleRemoveClick(params.row)}>
                  <Delete />
                </IconButton>
              </span>
            </Stack>
            <EditDialog
              productId={params.id}
              open={openEditDialogs[params.id] || false}
              handleClose={() => handleCloseClicked(params.id)}
            />
          </Fragment>
        );
      },
    },
  ];

  // Inherit the theme from the docs site (dark/light mode)
  const existingTheme = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({}, heIL, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <DataGrid key={categoryId} rows={products} columns={columns} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
