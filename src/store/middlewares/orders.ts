/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";
import { IOrder } from "../../@types/order";

// ---- 6/ creation du thunk avec createAsyncThunk de toolkit

export const fetchOrdersThunk = createAsyncThunk(
  // nom de l'action :
  "orders/GET_ORDERS",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async (userId: number) => {
    // ---- 7/ ecriture de la requete API dans le thunk
    // console.log("result");
    const result = await myAxiosInstance.get(`/users/${userId}/orders`);
    // console.log(result);

    // ---- 10/ return dans le thunk de la réponse de l'API : elle sera dispo dans le payload de l'action fullfilled
    return result.data;
  }
);
export const addOrderThunk = createAsyncThunk(
  "orders/CREATE_ORDER",
  async () => {
    try {
      const result = await myAxiosInstance.post("/orders");
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
);

export const editOrderThunk = createAsyncThunk(
  "orders/EDIT_ORDER",
  async ({ id, ...newOrderData }) => {
    try {
      const result = await myAxiosInstance.put(`/orders/${id}`, newOrderData);
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error editing order:", error);
      throw error;
    }
  }
);

export const fetchOrderThunk = createAsyncThunk(
  "orders/GET_ORDER",
  async ({ id }) => {
    try {
      const result = await myAxiosInstance.get(`/orders/${id}`);
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
);
