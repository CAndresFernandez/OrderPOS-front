import { useState } from "react";

import "./Login.scss";

function Login() {
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
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login" />
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
        <label htmlFor="password" />
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
      <button type="submit">Se connecter</button>
    </form>
  );
}
export default Login;
