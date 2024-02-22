import { configureStore } from "@reduxjs/toolkit";
import totalItemsSlice from "./totalItemsSlice";

const store = configureStore({
  reducer: {
    totalItems: totalItemsSlice,
  },
});

export default store;
