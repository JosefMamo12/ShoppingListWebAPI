import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchCategoriesProducts = createAsyncThunk(
  "category/categoriesProducts",
  async () => {
    const response = await api.get("api/Category/products");
    return response.data;
  }
);

const initialState = {
  products: [],
  categoriesProducts: [],
};

const listSummarySlice = createSlice({
  name: "listSummary",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesProducts.fulfilled, (state, action) => {
      state.categoriesProducts = action.payload;
    });
  },
});

// Define selectors
export const selectCategoriesProducts = (state) =>
  state.listSummary.categoriesProducts;

export default listSummarySlice.reducer;
