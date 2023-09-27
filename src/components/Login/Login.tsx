import { FormEvent, useState } from "react";

import "./Login.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ControlledInput from "./ControlledInput";
import checkLogin from "../../store/middlewares/login";
import { getActionDisconnect } from "../../store/reducers/loginReducer";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state) => state.login.isConnected);
  console.log(isConnected);
  // const isConnected = false;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(checkLogin());
  };

  const handleDisconnect = () => {
    dispatch(getActionDisconnect());
  };
  const loggedMessage = "You are login!";
  return (
    <div className="login-form">
      {isConnected ? (
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleDisconnect}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ControlledInput name="login" />
          <ControlledInput name="password" type="password" />
          <button type="submit" className="login-form-button">
            Login
          </button>
        </form>
      )}
      <Link to="/">
        <button type="button" className="login-form-button">
          Back
        </button>
      </Link>
    </div>
  );
}
export default Login;
