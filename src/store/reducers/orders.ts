import { createReducer } from "@reduxjs/toolkit";
import { Recipe } from "../../@types/recipe";
import {
  fetchFavRecipesThunk,
  fetchRecipesThunk,
} from "../middlewares/fetchRecipesThunk";

interface RecipesState {
  list: Recipe[];
  favlist: Recipe[];
  isLoading: boolean;
}
export const initialState: RecipesState = {
  list: [],
  favlist: [],
  isLoading: true,
};

const recipesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchRecipesThunk.fulfilled, (state, action) => {
      // enregistre les recettes reçues par le thunk dans le state
      state.list = action.payload;
      // puisqu'on a reçu les recettes on précise qu'on peut les afficher (et enlever le loader)
      state.isLoading = false;
    })
    .addCase(fetchRecipesThunk.rejected, (state, action) => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      state.isLoading = false;
    })
    .addCase(fetchFavRecipesThunk.fulfilled, (state, action) => {
      // enregistre les recettes pref dans le state
      state.favlist = action.payload;
    });
});

export default recipesReducer;
