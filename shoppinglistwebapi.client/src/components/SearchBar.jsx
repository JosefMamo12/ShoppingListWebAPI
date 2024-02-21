/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
    Button,
    CircularProgress,
    TextField,
    Typography,
    useMediaQuery,
    Box
} from "@mui/material";
import Categories from "./Categories";
import { getCategories } from "../api/GetCategory";

function SearchBar() {
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [addItemFlag, setAddItemFlag] = useState(false);
    
    const handleClick = () => {
        if (!text || !category) {
            console.log("Please fill both fields");
        } else {
        
            setAddItemFlag(true);
            fetch('https://localhost:7263/api/Product', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "CategoryId": category.id,
                    "ProductName": text
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item');
                }
                setAddItemFlag(false);
                getCategories();
                setText(""); // Clear the input field after adding an item
            })
            .catch(error => {
                console.error("Error adding item: ", error);
                setAddItemFlag(false); // Make sure to reset the flag in case of error
            });
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2} // Add some space between elements
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2} // Add some space between elements
                >
                    <TextField
                        sx={{minWidth:"150px"} }
                        id="outlined"
                        variant="outlined"
                        dir="rtl"
                        label="רשום מוצר"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Categories category={category} onCategoryChange={setCategory} />
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        sx={{
                            borderRadius: "10px",
                            color: "white",
                            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                            border: "2px solid green",
                        }}
                        color="primary"
                        disabled={addItemFlag}
                    >
                        {addItemFlag ? <CircularProgress /> : "הוסף מוצר"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );

}

export default SearchBar;