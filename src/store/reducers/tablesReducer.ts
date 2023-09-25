import { createReducer } from "@reduxjs/toolkit";
import { fetchTablesThunk } from "../middlewares/tables";
import { ITable } from "../../@types/order";

interface RootState {
  list: ITable[];
}

export const initialState: RootState = {
  list: [],
};

const tablesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTablesThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addCase(fetchTablesThunk.rejected, (state, action) => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    });
});

export default tablesReducer;
