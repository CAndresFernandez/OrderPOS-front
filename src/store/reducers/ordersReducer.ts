import { createReducer } from "@reduxjs/toolkit";
import { IOrder } from "../../@types/order";
import { fetchOrderThunk, fetchOrdersThunk } from "../middlewares/orders";

interface RootState {
  list: IOrder[];
}

export const initialState: RootState = {
  list: [],
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addCase(fetchOrdersThunk.rejected, (state, action) => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    })
    .addCase(fetchOrderThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = [...state.list, action.payload];
      }
    })
    .addCase(fetchOrderThunk.rejected, (state, action) => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    });
});

export default ordersReducer;
