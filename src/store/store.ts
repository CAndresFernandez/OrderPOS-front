import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./reducers/tablesReducer";

const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

export default store;
