import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxiosInstance from './axios';

export const fetchRecipesThunk = createAsyncThunk(
  'recipes/GET_RECIPES',
  async () => {
    const result = await myAxiosInstance.get('/recipes');
    return result.data;
  }
);

export const fetchFavRecipesThunk = createAsyncThunk(
  'recipes/FETCH_FAV_RECIPES',
  async () => {
    const result = await myAxiosInstance.get('/favorites');
    return result.data.favorites;
  }
);