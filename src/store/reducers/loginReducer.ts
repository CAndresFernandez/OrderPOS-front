/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit";
import checkLogin from "../middlewares/login";

interface ISettingsState {
  login: string;
  password: string;
  isConnected: boolean;
}

const initialState: ISettingsState = {
  // login et password sont les valeurs des inputs du bloc settings
  // ces 2 données permettent de controller les input
  login: "",
  password: "",
  isConnected: false,
};

// ----- ACTION CREATORS -----
// action dispatchée quand un utilisateur tape dans l'input login ou password
interface IactionSetInputPayload {
  value: string; // valeur tapée dans l'input par l'utilisateur
  inputName: "login" | "password"; // le nom de la valeur à modifier dans le state de redux (soit login soit password)
}
export const getActionSetInput =
  createAction<IactionSetInputPayload>("login/SET_INPUT");

// action dispatchée au click sur le bouton de deconnexion
export const getActionDisconnect = createAction("login/DISCONNECT");

// ----- REDUCER -----
const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionSetInput, (state, action) => {
      // comment savoir quel valeur je dois modifier , login ou password ?
      // j'ai le nom de l'input dans le payload de l'action
      state[action.payload.inputName] = action.payload.value;
    })
    .addCase(checkLogin.fulfilled, (state, action) => {
      // on va ajouter un case pour checklogin.fullfilled qui va enregistrer le pseudo dans le state (on ne peux pas mettre de case pour juste actionCheckLogin puisque c'est asynchrone)
      state.login = action.payload;
      state.isConnected = true;
    })
    .addCase(getActionDisconnect, (state, action) => {
      // cette action arrive dans le reducer quand elle est dispatché au click sur le bouton deconnexion : on met alors isConnected à false
      state.isConnected = false;
      state.login = null;
    });
});

export default settingsReducer;
