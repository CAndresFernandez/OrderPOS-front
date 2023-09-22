import { createAction, createReducer } from "@reduxjs/toolkit";
import checkLogin from "../middlewares/loginThunk";
import checkLocalStorage from "../middlewares/localStorageMiddleware";

interface UserState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: null | string;
  errorMessage: null | string;
  token: null | string;
}
export const initialState: UserState = {
  logged: false,
  credentials: {
    email: "",
    password: "",
  },
  pseudo: null,
  errorMessage: null,
  token: null,
};

export const setCredentials = createAction<{
  inputValue: string;
  inputName: "email" | "password";
}>("user/SET_CREDENTIALS");

export const logOut = createAction("user/LOGOUT");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCredentials, (state, action) => {
      // mettre la valeur de inputValue dans l'emplacement inputName (soit email soit password)
      // il recupere inputValue et inputName en payload !
      state.credentials[action.payload.inputName] = action.payload.inputValue;
      // state.credentials.email = action.payload.inputValue;
      // state.credentials.password = action.payload.inputValue;
    })
    .addCase(checkLogin.fulfilled, (state, action) => {
      // mettre isLogged à true dans le state
      // enregistrer le speudo et le tocken dans le state
      state.logged = true;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;
      state.errorMessage = null;
    })
    .addCase(checkLogin.rejected, (state, action) => {
      // enregistrer un message d'erreur
      state.errorMessage = "erreur de connexion";
    })
    .addCase(logOut, (state, action) => {
      // on met logged à false
      state.logged = false;
    })
    .addCase(checkLocalStorage.fulfilled, (state, action) => {
      // on enregistre le token dans le state et on dit qu'on est connecté
      state.token = action.payload;
      state.logged = true;
    });
});

export default userReducer;
