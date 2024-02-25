import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  value: 0,
  status: "",
};

export const fetchTotalItems = createAsyncThunk(
  "items/totalItems",
    async () => {
        const response = await api.get("api/Category/sum")
    console.log(response)
    return response.data
  },
//   async (
//     arg,
//     { dispatch, getState, extra, requestId, signal, rejectWithValue }
//   ) => {
//     return await api
//       .get("api/Category/sum")
//       .then((res) => {
//         if (!res.ok) {
//           return rejectWithValue([], "api url not found");
//         }
//         return res.json();
//       })
//       .catch((error) => {
//         return rejectWithValue([], error);
//       });
//   }
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
        })

      //builder.addCase(fetchTotalItems.pending),
      //(state, action) => {
      //  console.log("pending")
      //  state.status = "loading";
      //},
      //[fetchTotalItems.fulfilled],
      //(state, action) => {
      //  console.log("FFFFFFFFFFFFFFFF" +action.payload)
      //  state.value = action.payload;
      //  state.status = "success";
      //},
      //[fetchTotalItems.rejected],
      //(state, action) => {
      //  console.log("rejected")
      //  state.status = "failed";
      //};
  },
});
export const { incrementTotal, decrementTotal } = totalItemsSlice.actions;
export default totalItemsSlice.reducer;
