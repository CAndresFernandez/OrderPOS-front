import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./reducers/tablesReducer";
import itemsReducer from "./reducers/itemsReducer";

const store = configureStore({
  reducer: {
    tables: tablesReducer,
    items: itemsReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
