/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useCallback } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { getCategories } from "../api";

// eslint-disable-next-line react/prop-types
function Categories({ label, category, onCategoryChange, key }) {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleAutoCompleteChange = (event, newValue) => {
    onCategoryChange(newValue);
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        if (active) {
          setOptions(await getCategories());
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div style={{ direction: "rtl" }}>
      <Autocomplete
        key={key}
        onOpen={() => {
          setOpen(true);
          setLoading(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        onChange={handleAutoCompleteChange}
        renderInput={(params) => (
          <TextField
            margin="dense"
            sx={{
              minWidth: "300px",
              backgroundColor: "white",
            }}
            {...params}
            fullWidth
            placeholder={category ? category.name : ""}
            label={label ? label : ""}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}

export default Categories;
