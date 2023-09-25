import { createReducer } from "@reduxjs/toolkit";
import { fetchTablesThunk } from "../middlewares/tables";
import { ITable } from "../../@types/order";

interface RootState {
  tables: ITable[];
}

export const initialState: RootState = {
  tables: [],
};

const tablesReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchTablesThunk.fulfilled, (state, action) => {
    state.tables = action.payload;
  });
});

export default tablesReducer;
