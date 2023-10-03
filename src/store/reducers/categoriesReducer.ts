import { createReducer } from "@reduxjs/toolkit";
import { ICategory } from "../../@types/order";
import { fetchCategoriesThunk } from "../middlewares/categories";

interface RootState {
  list: ICategory[];
}

export const initialState: RootState = {
  list: [],
};

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.list = action.payload;
      console.log("fulfilled");
    })
    .addCase(fetchCategoriesThunk.rejected, (state, action) => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      console.log("rejected");
    });
});

export default categoriesReducer;
