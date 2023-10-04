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
  async ({ user_id, relatedTable_id }) => {
    try {
      const result = await myAxiosInstance.post("/orders", {
        user_id,
        relatedTable_id,
      });
      console.log(result.data);
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
  async (id: number) => {
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
export const fetchOrderByTableIdThunk = createAsyncThunk(
  "orders/GET_ORDER_BY_TABLE_ID",
  async (tableId: number) => {
    try {
      const result = await myAxiosInstance.get(`/tables/${tableId}/orders`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
);
export const addItemToCurrentOrderThunk = createAsyncThunk(
  "orders/ADD_ITEM_TO_CURRENT_ORDER",
  async ({ orderId, itemId }: { orderId: number; itemId: number }) => {
    try {
      // Assuming the API endpoint to add an item to an order is `/orders/:orderId/items`
      const result = await myAxiosInstance.put(
        `/orders/${orderId}/items/${itemId}`
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw error;
    }
  }
);
export const changeStatusOrderThunk = createAsyncThunk(
  "orders/CHANGE_STATUS_CURRENT_ORDER",
  async ({
    orderId,
    orderStatus,
  }: {
    orderId: number;
    orderStatus: number;
  }) => {
    try {
      // Assuming the API endpoint to add an item to an order is `/orders/:orderId/items`
      const result = await myAxiosInstance.put(`/orders/${orderId}/status`, {
        orderStatus,
      });
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw error;
    }
  }
);

export const plusItemToCurrentOrderThunk = createAsyncThunk(
  "order-items/ADD_ITEM_TO_CURRENT_ORDER",
  async ({ orderId, itemId }: { orderId: number; itemId: number }) => {
    try {
      // Assuming the API endpoint to add an item to an order is `/orders/:orderId/items`
      const result = await myAxiosInstance.put(`/order-items/add/${itemId}`);
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw error;
    }
  }
);
export const minusItemToCurrentOrderThunk = createAsyncThunk(
  "order-items/REMOVE_ITEM_FROM_CURRENT_ORDER",
  async ({ orderId, itemId }: { orderId: number; itemId: number }) => {
    try {
      // Assuming the API endpoint to add an item to an order is `/orders/:orderId/items`
      const result = await myAxiosInstance.put(`/order-items/remove/${itemId}`);
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw error;
    }
  }
);
export const editCommOrderThunk = createAsyncThunk(
  "order-items/EDIT_COMMENT_OF_ ORDER_ITEM",
  async ({
    orderId,
    itemId,
    comment,
  }: {
    orderId: number;
    itemId: number;
    comment: string;
  }) => {
    try {
      // Assuming the API endpoint to add an item to an order is `/orders/:orderId/items`
      const result = await myAxiosInstance.put(
        `/order-items/comment/${itemId}`,
        { comment }
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error adding item to order:", error);
      throw error;
    }
  }
);
export const deleteOrderThunk = createAsyncThunk(
  "orders/DELETE_ORDER",
  async (orderId) => {
    try {
      const result = await myAxiosInstance.post(`/orders/${orderId}/closed`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
);
