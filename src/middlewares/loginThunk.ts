import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import myAxiosInstance from './axios';
import { saveJWTToLocalStorage } from '../localStorage/localStorage';

const checkLogin = createAsyncThunk('user/CHECK_LOGIN', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const result = await myAxiosInstance.post('/login', {
    email: state.user.credentials.email,
    password: state.user.credentials.password,
  });
  myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;

  saveJWTToLocalStorage(result.data.token);
  // console.log(result.data);

  return result.data as { pseudo: string; token: string };
});

export default checkLogin;