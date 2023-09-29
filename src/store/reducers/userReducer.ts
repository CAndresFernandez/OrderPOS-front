import { createAction, createReducer } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";
import {
  saveJWTToLocalStorage,
  saveUserIdToLocalStorage,
} from "../../localStorage/localStorage";

export interface UserState {
  id: number | null;
  logged: boolean;
  login: string;
  errorMessage: string | null;
  token: null | string;
}
export const initialState: UserState = {
  id: null,
  logged: false,
  login: "",
  errorMessage: null,
  token: null,
};

export const getActionDisconnect = createAction("login/DISCONNECT");
export const getActionLogin = createAction<{ token: string; id: number }>(
  "login"
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionLogin, (state, action) => {
      // mettre isLogged à true dans le state
      // enregistrer le speudo et le tocken dans le state
      // console.log(action.id, action.token);
      state.logged = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      // on va enregistrer les entetes header autorisation dans l'instance d'axios
      myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;

      // on va aussi enregistrer le token dans le localStorage
      saveJWTToLocalStorage(action.payload.token);
      saveUserIdToLocalStorage(action.payload.id);

      // state.errorMessage = null;
    })
    // .addCase(login.rejected, (state, action) => {
    //   // enregistrer un message d'erreur
    //   state.errorMessage = "erreur de connexion";
    // })
    .addCase(getActionDisconnect, (state, action) => {
      // on met logged à false
      state.logged = false;
    });
});

export default userReducer;
