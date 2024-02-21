/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useCallback } from 'react';
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Categories({ category, onCategoryChange }) {
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
                const response = await fetch('https://localhost:7263/api/Category');
                const data = await response.json();
                if (active) {
                    setOptions(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
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

    //const categories = [
    //    { "Id": 1, "Name": "חלב וביצים" },
    //    { "Id": 2, Name: "ירקות ופירות" },
    //    { "Id": 3, "Name": "מוצרי ניקיון" },
    //    { "Id": 4, "Name": "מאפים" },
    //    { "Id": 5, "Name": "מוצרי חלב" }
    //]

    return (
        <div style={{ direction: "rtl" }} className="App">
            <Autocomplete
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
                        sx={{ minWidth: "300px" }}
                        {...params}
                        label="בחר קטגוריה"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
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