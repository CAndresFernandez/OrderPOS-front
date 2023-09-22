import { createReducer } from "@reduxjs/toolkit";

interface RootState {
  table: null | string;
}

const initialState: RootState = {
  table: "table1",
};

const jokeReducer = createReducer(initialState, (builder) => {
  // case à venir ...
});

export default jokeReducer;
