import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./reducers/tablesReducer";

const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
