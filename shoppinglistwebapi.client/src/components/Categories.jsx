/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from 'react';

function Categories() {
    const [categories, setCategories] = useState([]);

    fetch('https://localhost:7263/api/Category')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Unable to get items.', error));

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
                autoHighlight
                limitTags={2}
                id="categories"
                options={categories}
                getOptionLabel={(option) => option.Name || " "}
                defaultValue={[]}
                name="category"
                style={{ direction: "rtl", width: "300px" }}
                renderInput={(params) => (
                    <TextField
                        style={{ direction: "rtl", marginLeft: "30px" }}
                        {...params}
                        label="בחר קטגוריה"
                        placeholder="בחר קטגוריה"
                        fullWidth
                        dir="rtl"
                    />
                )}
            />
        </div>
    );
}


export default Categories;