import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalItems } from "../api";

const initialState = {
  value: 0,
  status: "",
};

export const fetchTotalItems = createAsyncThunk(
  "items/totalItems",
  async () => {
    return await getTotalItems();
  }
);

const totalItemsSlice = createSlice({
  name: "totalItems",
  initialState,
  reducers: {
    incrementTotal(state, action) {
      state.value += 1;
    },
    decrementTotal(state, action) {
      state.value -= 1;
    },
    changeTotalItemsByValue(state, action) {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotalItems.pending, (state, action) => {
      // Add user to the state array
      state.status = "loading";
    }),
      builder.addCase(fetchTotalItems.fulfilled, (state, action) => {
        // Add user to the state array
        state.value = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchTotalItems.rejected, (state, action) => {
        // Add user to the state array
        state.status = "failed";
      });
  },
});
export const selectTotalItems = (state) => state.totalItems;
export const { changeTotalItemsByValue, incrementTotal, decrementTotal } =
  totalItemsSlice.actions;
export default totalItemsSlice.reducer;
