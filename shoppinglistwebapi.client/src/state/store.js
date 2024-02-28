import { configureStore } from "@reduxjs/toolkit";
import totalItemsSlice from "./totalItemsSlice";
import listSummarySlice from "./listSummarySlice";

const store = configureStore({
  reducer: {
    totalItems: totalItemsSlice,
    categoriesProducts: listSummarySlice,
  },
});

export default store;
