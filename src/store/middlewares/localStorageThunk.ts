import { createAsyncThunk } from '@reduxjs/toolkit';
import { getJWTToLocalStorage } from '../localStorage/localStorage';
import myAxiosInstance from './axios';

const checkLocalStorage = createAsyncThunk('user/CHECK_LOCAL_STORAGE', () => {
  const jwt = getJWTToLocalStorage();
  if (jwt) {
    // on veut l'enregistrer dans l'instance axios + le state
    myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${jwt}`;

    return jwt;
  }

  throw new Error('pas de token');
});
export default checkLocalStorage;