import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchCategoriesProducts = createAsyncThunk(
  "category/categoriesProducts",
  async () => {
    const response = await api.get("api/Category/products");
    return response.data;
  }
);

const listSummarySlice = createSlice({
  name: "categoriesProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesProducts.fulfilled, (state, action) => {
      // Add user to the state array
      return action.payload;
    });
  },
});

export const selectCategoriesProducts = (state) => state.categoriesProducts;

export default listSummarySlice.reducer;
