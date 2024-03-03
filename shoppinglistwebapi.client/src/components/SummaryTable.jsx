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
  const [openEditDialogs, setOpenEditDialogs] = useState(false);
  const [productEdit, setProductEdit] = useState([]);

  // const handleOpenClicked = (index) => {
  //   setOpenEditDialogs(true);
  // };
  const toggleIsOpen = () => {
    setOpenEditDialogs(!openEditDialogs);
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
        //console.log("sdsdsdsd", params.row);
        return (
          <Fragment>
            <Stack direction="row">
              <span>
                <IconButton onClick={() => openForEdit(params.row)}>
                  <Edit />
                </IconButton>
              </span>
              <span>
                <IconButton onClick={() => handleRemoveClick(params.row)}>
                  <Delete />
                </IconButton>
              </span>
            </Stack>
          </Fragment>
        );
      },
    },
  ];

  function openForEdit(id) {
    setProductEdit(id);
    toggleIsOpen();
    console.log(productEdit);
  }
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
        {openEditDialogs == false ? (
          <></>
        ) : (
          <EditDialog
            product={productEdit}
            open={openEditDialogs || false}
            z
            handleClose={() => toggleIsOpen()}
          />
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
