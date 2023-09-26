/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxiosInstance from "./axios";

// ---- 6/ creation du thunk avec createAsyncThunk de toolkit

export const fetchOrdersThunk = createAsyncThunk(
  // nom de l'action :
  "orders/GET_ORDERS",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async () => {
    // ---- 7/ ecriture de la requete API dans le thunk
    // console.log("result");
    const result = await myAxiosInstance.get("/orders");
    // console.log(result);

    // ---- 10/ return dans le thunk de la réponse de l'API : elle sera dispo dans le payload de l'action fullfilled
    return result.data;
  }
);
export const addOrderThunk = createAsyncThunk(
  // nom de l'action :
  "orders/CREATE_ORDER",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async (newOrderData) => {
    // J'envoie à l'API le label de la nouvelle order
    const result = await myAxiosInstance.post("/orders", newOrderData);
    // l'API nous renvoie la nouvelle liste d'orders
    // on maintient à jour le state avec cette valeur de retour
    return result.data;
  }
);
