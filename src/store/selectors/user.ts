import { getJWTFromLocalStorage } from "../../localStorage/localStorage";
import { UserState } from "../reducers/userReducer";

const isLogged = (state: UserState) => {
  return getJWTFromLocalStorage();
};

export default isLogged;
