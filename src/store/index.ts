import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./reducers/tablesReducer";
import itemsReducer from "./reducers/itemsReducer";
import ordersReducer from "./reducers/ordersReducer";

const store = configureStore({
  reducer: {
    tables: tablesReducer,
    items: itemsReducer,
    orders: ordersReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
