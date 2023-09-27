import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "..";
import myAxiosInstance from "./axios";
import { saveJWTToLocalStorage } from "../../localStorage/localStorage";

const checkLogin = createAsyncThunk("user/CHECK_LOGIN", async (_, thunkAPI) => {
  // il nous faut les données tapées par l'utilisateur dans les inputs
  // les inputs sont controlés par le state de redux
  // on va chercher les données dans le state de redux
  const state = thunkAPI.getState() as RootState;

  const result = await myAxiosInstance.post("/login", {
    login: state.login.login,
    password: state.login.password,
  });
  console.log(result);
  console.log("result");

  // on a recuperé le pseudo et le token de l'api : on veut les enregistrer dans le state
  // on veut mettre logged à true dans le state
  // on returne les données de l'API elle seront envoyée en payload de l'action fullfilled
  // le reducer pourra alors les recuperer et les enregistrer dans le state
  // on va enregistrer le token dans le state

  //   // on va enregistrer les entetes header autorisation dans l'instance d'axios
  myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;

  //   // on va aussi enregistrer le token dans le localStorage
  saveJWTToLocalStorage(result.data.token);

  /*
    on reçoit un JWT qui ressemble à ça : 
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMyLCJpYXQiOjE2OTQxNzE0NTAsImV4cCI6MTY5NDE4MjI1MH0.RcUmPJYWxRpzeEGCYxY-qhw64SX8ZLNB6Ta0edsA-gs
    on a vu que c'est du JSON encodé en base64, qu'il contient notre id de user et qu'il est signé donc on ne peut pas le modifier
    on pourrait le stocker en cokie ou localStorage pour une plus longue durée de vie mais pour faire simple on va le stocker dans le state
    donc on le return pour qu'il soit ajouté au payload de l'action fullfilled qui va arriver chez le reducer
  */
  return result.data;
});

export default checkLogin;
