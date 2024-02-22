import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  value: 0,
  status: "",
};

export const fetchTotalItems = createAsyncThunk(
  "items/totalItems",
  async (
    arg,
    { dispatch, getState, extra, requestId, signal, rejectWithValue }
  ) => {
    return await api
      .get("api/Category/sum")
      .then((res) => {
        if (!res.ok) {
          return rejectWithValue([], "api url not found");
        }
        return res.json();
      })
      .catch((error) => {
        return rejectWithValue([], error);
      });
  }
);

const totalItemsSlice = createSlice({
  name: "totalItems",
  initialState,
  reducers: {
    increamentTotal(state, action) {
      state.value += 1;
    },
    decrementTotal(state, action) {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder[fetchTotalItems.pending],
      (state, action) => {
        state.status = "loading";
      },
      [fetchTotalItems.fulfilled],
      (state, action) => {
        state.value = action.payload;
        state.status = "success";
      },
      [fetchTotalItems.rejected],
      (state, action) => {
        state.status = "failed";
      };
  },
});
export const { increamentTotal, decrementTotal } = totalItemsSlice.actions;
export default totalItemsSlice.reducer;
