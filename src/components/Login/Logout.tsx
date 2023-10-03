import React from "react";
import { getActionDisconnect } from "../../store/reducers/userReducer"; // Ajustez le chemin d'importation en fonction de votre structure de projet
import "./Login.scss"; // Assurez-vous que le chemin vers le fichier SCSS est correct
import { useAppDispatch } from "../../hooks/redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedMessage = "You are logged in!";

  const handleDisconnect = () => {
    // Supprimez le token du localStorage
    localStorage.removeItem("token");
    // Mettez à jour le state Redux
    dispatch(getActionDisconnect());
    // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
    // Si vous utilisez react-router-dom, vous pouvez utiliser useHistory pour cela
    navigate("/login");
  };

  return (
    <div className="login-form">
      <div className="login-form-logged">
        <p className="login-form-message">{loggedMessage}</p>
        <button
          type="button"
          className="login-form-button"
          onClick={handleDisconnect}
        >
          Logout
        </button>
        <Link to="/" className="login-form-button">
          back
        </Link>
      </div>
    </div>
  );
}

export default Logout;
