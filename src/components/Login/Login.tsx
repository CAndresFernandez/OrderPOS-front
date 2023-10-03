import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import login from "../../api/login";
import { useAppDispatch } from "../../hooks/redux";
import { getActionLogin } from "../../store/reducers/userReducer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // console.log(isConnected);
  // const isConnected = false;
  const dispatch = useAppDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      const {
        token,
        data: { id },
      } = response;
      dispatch(getActionLogin({ token, id }));
      navigate("/");
      // Gérez la réponse de l'API (par exemple, stockez le token dans le localStorage)
      console.log(response.data);
    } catch (error) {
      // Gérez les erreurs de connexion
      setError("Invalid credentials");
    }
  };

  const loggedMessage = "You are login!";
  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="settings-input"
          placeholder="username"
          value={username} // control en lecture : on affiche la donnée de redux
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="settings-input"
          placeholder="password"
          value={password} // control en lecture : on affiche la donnée de redux
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
export default Login;
