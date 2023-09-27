import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchTablesThunk } from "./store/middlewares/tables";
import { fetchOrdersThunk } from "./store/middlewares/orders";
import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Orders from "./components/Orders/Orders";
import Login from "./components/Login/Login";
import "./App.scss";
import { getJWTFromLocalStorage } from "./localStorage/localStorage";

function App() {
  const dispatch = useAppDispatch();
  const token = getJWTFromLocalStorage();
  const base64Url = token.split(".")[1]; // Obtenez la partie payload du JWT
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const payload = JSON.parse(atob(base64));

  console.log(payload);

  const userId = payload.username;
  console.log(userId);

  // const userId = useAppSelector((state) => state.user.id); // on va chercher l'id de l'utilisateur
  const isConnected = useAppSelector((state) => state.login.isConnected);
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchTablesThunk());
    dispatch(fetchOrdersThunk(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="body">
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/tables/30/order" element={<CurrentOrder />} />
          <Route path={`/users/${{ userId }}/orders`} element={<Orders />} />
          <Route path="/login_check" element={<Login />} />
        </Routes>
      </div>
      {isConnected && <Navbar userId={userId} />}
    </>
  );
}

export default App;
