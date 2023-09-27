import { useState } from "react";

import "./Login.scss";

function Login() {
  const isLogged = false;
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez gérer la soumission du formulaire, par exemple, en appelant une API d'authentification.
    console.log("Credentials:", credentials);
  };
  const handleLogout = () => {
    console.log("Logout");
    // Ici, vous pouvez gérer la déconnexion de l'utilisateur.
  };

  const loggedMessage = "You are login!";
  return (
    <div className="login-form">
      {isLogged ? (
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="login"
              type="text"
              id="login"
              name="login"
              value={credentials.login}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="password"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-form-button">
            Login
          </button>
        </form>
      )}
    </div>
  );
}
export default Login;
