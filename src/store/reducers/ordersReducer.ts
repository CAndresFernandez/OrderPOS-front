import { createReducer } from "@reduxjs/toolkit";
import { IOrder } from "../../@types/order";
import {
  addItemToCurrentOrderThunk,
  fetchOrderByTableIdThunk,
  fetchOrderThunk,
  fetchOrdersThunk,
  minusItemToCurrentOrderThunk,
  plusItemToCurrentOrderThunk,
} from "../middlewares/orders";

interface RootState {
  list: IOrder[];
  currentOrder: IOrder | null;
}

export const initialState: RootState = {
  list: [],
  currentOrder: null,
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addCase(fetchOrdersThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    })
    .addCase(fetchOrderThunk.fulfilled, (state, action) => {
      console.log("fetched items");
      if (action.payload) {
        state.currentOrder = action.payload;
      }
    })
    .addCase(fetchOrderThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("fetch order rejected");
    })
    .addCase(fetchOrderByTableIdThunk.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    })
    .addCase(fetchOrderByTableIdThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    })
    .addCase(addItemToCurrentOrderThunk.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    })
    .addCase(addItemToCurrentOrderThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    })

    .addCase(plusItemToCurrentOrderThunk.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    })
    .addCase(plusItemToCurrentOrderThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    })

    .addCase(minusItemToCurrentOrderThunk.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    })
    .addCase(minusItemToCurrentOrderThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    });
});

export default ordersReducer;
